/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useContext, useEffect, useState } from "react"
import context from "../../context/context"
import toast from "react-hot-toast"

function MakeBill() {

    const { id } = useParams()

    const [option, setOption] = useState("");

    const { getAllMedicine, getAllBill } = useContext(context)
    const [search, setSearch] = useState("")
    const filterSearchData = getAllMedicine.filter((obj) => obj.batch.includes(search))


    const handleRadioChange = (event) => {
        setOption(event.target.value);
    }

    const [chemist, setChemist] = useState({
        name: "",
        address: "",
        gst: "",
        dl1: "",
        dl2: "",
        phno: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        )
    })

    const getChemist = async () => {
        try {
            const chemistTemp = await getDoc(doc(db, 'chemist', id))
            const chemist = chemistTemp.data()
            setChemist({
                name: chemist?.name,
                address: chemist?.address,
                gst: chemist?.gst,
                dl1: chemist?.dl1,
                dl2: chemist?.dl2,
                phno: chemist?.phno,
                time: chemist?.time,
                date: chemist?.date
            })
        } catch (error) {
            console.error("Enter is reading single chemist details ", error)
        }
    }

    const [medicine, setMedicine] = useState([])
    const [qty, setQty] = useState("")
    const [free, setFree] = useState("")
    const [amt, setAmt] = useState(0)

    const getMedicines = async () => {
        if (search === "")
            toast.error("Enter Batch Number")

        try {
            const q = query(
                collection(db, "medicine"),
                where('batch', '==', search)
            )
            const data = onSnapshot(q, (QuerySnapshot) => {
                let medicineData = []
                QuerySnapshot.forEach(async (doc) => {
                    const data = doc.data()
                    const medicineTemp = {
                        name: data.name,
                        mfr: data.mfr,
                        hsn: data.hsn,
                        pack: data.pack,
                        batch: data.batch,
                        exp: data.exp,
                        qty: qty,
                        free: free,
                        mrp: data.mrp,
                        trp: data.trp,
                        gst: data.gst
                    }
                    if (parseInt(qty) + parseInt(free) > parseInt(data.stock)) return toast.error("Insufficient Stock")
                    medicineData.push(medicineTemp)
                    setAmt(amt + (qty * data.trp))
                })
                setMedicine(prev => [...prev, ...medicineData])
                setSearch("")
                setQty("")
                setFree("")
            })
            return () => data
        } catch (error) {
            console.log("Error in getting medicine details", error)
        }
    }

    const convertToWords = (amt) => {
        if (amt === 0) return "zero"
        const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
        const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
        const thousands = ["", "thousand"]

        function helper(n) {
            if (n === 0) return ""
            else if (n < 20) return belowTwenty[n] + " "
            else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10)
            else return belowTwenty[Math.floor(n / 100)] + " hundred and " + helper(n % 100)
        }
        let word = ""
        let i = 0
        while (amt > 0) {
            if (amt % 1000 != 0)
                word = helper(amt % 1000) + thousands[i] + " " + word
            amt = Math.floor(amt / 1000)
            i++
        }
        return word.trim()
    }

    const [bill, setBill] = useState(null)

    useEffect(() => {
        if (chemist.name) {
            setBill({
                billno: getAllBill.length + 1,
                chemist: chemist.name,
                address: chemist.address,
                amt: Math.round(amt + 2 * (amt * 0.06)).toFixed(2),
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-UK",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                )
            })
        }
    }, [chemist, amt])

    const navigate = useNavigate()

    const storeBills = async () => {
        try {
            const billRef = collection(db, 'bill')
            await addDoc(billRef, bill)
            toast.success("Bill added successfully")
            navigate('/billdetails')
        } catch (error) {
            console.error("Error in storing bills", error)
        }
    }

    useEffect(() => {
        getChemist()
    }, [])

    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Make Bill</h1>
            <div className="px-10">
                <div>
                    <label className="text-green-900 text-lg font-bold">Batch: </label>
                    <input
                        type="text"
                        placeholder="Enter Batch Number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-50 rounded-md outline-none placeholder-green-700"
                    />
                </div>
                <div className="px-15 justify-center">
                    {search &&
                        <div className="block absolute bg-green-700 w-50 text-yellow-50 md:w-50 lg:w-50 my-1 rounded-lg px-2 py-2">
                            {filterSearchData.length > 0 ?
                                <>
                                    {filterSearchData.map((item, index) => {
                                        return (
                                            <div key={index} className="text-center cursor-pointer" onClick={() => setSearch(item.batch)}>
                                                {item.batch} ({item.stock})
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </> : <>
                                    <div className="flex justify-center">
                                        <h3>No Medicine Found</h3>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
                <div className="flex mt-15">
                    <div className="mr-20">
                        <label className="text-green-900 text-lg font-bold">Quantity: </label>
                        <input
                            type="number"
                            name="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            placeholder="Enter Quantity"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-50 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mr-30">
                        <label className="text-green-900 text-lg font-bold">Free: </label>
                        <input
                            type="number"
                            name="free"
                            value={free}
                            onChange={(e) => setFree(e.target.value)}
                            placeholder="Enter Free"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-50 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mr-30">
                        <label className="flex items-center space-x-2 text-green-900 text-md font-bold">
                            <input
                                type="radio"
                                name="radioGroup"
                                value="Cash"
                                checked={option === "Cash"}
                                onChange={handleRadioChange}
                                className="w-4 h-4 accent-green-700"
                            />
                            <span>Cash</span>
                        </label>

                        <label className="flex items-center space-x-2 text-green-900 text-md font-bold">
                            <input
                                type="radio"
                                name="radioGroup"
                                value="Credit"
                                checked={option === "Credit"}
                                onChange={handleRadioChange}
                                className="w-4 h-4 accent-green-700"
                            />
                            <span>Credit</span>
                        </label>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => { getMedicines()}}
                            className="hover:bg-green-700 hover:text-yellow-50 bg-yellow-50 border border-green-700 text-green-700 text-center py-2 w-50 cursor-pointer font-bold rounded-md text-xl"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <h1 className="text-center font-bold text-3xl text-green-700 mt-20 mb-5">Bill Details</h1>
            <div className="w-full overflow-x-auto mt-5 p-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-green-700 text-pink-400">
                    <tbody>
                        <tr className="border-b">
                            <td scope="col" colSpan={13} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-center">
                                <p className="font-bold text-3xl text-green-700">Swastik Pharma</p>
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td scope="col" colSpan={13} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-center">
                                <p className="font-bold text-xl text-green-700">TAX INVOICE</p>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">Address: Ground Floor, Shop No 1, </td>
                            <td scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700">{option}</td>
                            <td scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">To, {chemist.name}</td>
                        </tr>
                        <tr className="text-center border-b">
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">Rameshwar Nagar, Macche, Belagavi - 590014</th>
                            <th scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700">Invoice No: {(getAllBill.length) + 1}</th>
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">Address: {chemist.address}</th>
                        </tr>
                        <tr className="text-center border-b">
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">GSTN: 29AEYFS5351J1Z3</th>
                            <th scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 w-1/10">Date: {new Date().toLocaleString(
                                "en-UK",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                }
                            )}</th>
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">GSTN: {chemist.gst}</th>
                        </tr>
                        <tr className="text-center border-b">
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">DL No: 20-B: KA-BG3-256791</th>
                            <th scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700"></th>
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">DL No: {chemist.dl1}</th>
                        </tr>
                        <tr className="text-center border-b">
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">DL No: 20-B: KA-BG3-256792</th>
                            <th scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700"></th>
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">DL No: {chemist.dl2}</th>
                        </tr>
                        <tr className="text-center border-b">
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">Phone No: 9916151914</th>
                            <th scope="col" colSpan={3} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700"></th>
                            <th scope="col" colSpan={5} className="h-12 px-6 text-md font-bold fontPara border-l border-b first:border-l-0 border-green-700 text-green-700 text-left">Phone No: {chemist.phno}</th>
                        </tr>
                        <tr className="text-center">
                            <th scope="col" className="h-12 px-3 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-4 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">MFR</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">HSN</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Pack</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Batch</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Exp</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Qty</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Free</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">MRP</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">TRP</th>
                            <th scope="col" className="h-12 px-2 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">GST(%)</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Amount</th>
                        </tr>
                        {medicine.map((item, index) => {
                            return (
                                <tr key={index} className="text-pink-300 text-center text-md font-semibold">
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 ">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.mfr}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.name}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.hsn}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.pack}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.batch}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.exp}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.qty}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.free}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.mrp}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.trp}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.gst}
                                    </td>
                                    <td className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {(item.qty * item.trp).toFixed(2)}
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={5} rowSpan={4} className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase align-top">
                                <label className="text-green-900 text-lg font-bold">Payment Details:</label>
                                <div className="flex">
                                    <div>
                                        <label className="text-green-900 text-md font-bold">Bank: Union Bank of India</label><br />
                                        <label className="text-green-900 text-md font-bold">Branch: Tilakwadi, Belagavi</label><br />
                                        <label className="text-green-900 text-md font-bold">Name: Swastik Pharma</label><br />
                                        <label className="text-green-900 text-md font-bold">A/C No.: </label><br />
                                        <label className="text-green-900 text-md font-bold">IFSC Code: </label><br />
                                        <label className="text-green-900 text-md font-bold">UPI No.: 7996608996</label>
                                    </div>
                                    <div className="m-auto">
                                        <img src="/QRcode.png" alt="" width={150} height={150} />
                                    </div>
                                </div>
                            </td>

                            <td colSpan={6} rowSpan={2} className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 align-top">
                                <label className="text-green-900 text-md font-bold">Amount in words: <div>{convertToWords(Math.round(amt + 2 * (amt * 0.06)))} only.</div></label>
                            </td>

                            <td className="h-12 px-2 text-md text-right transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                <label className="text-green-900 text-md font-bold">Total: </label>
                            </td>
                            <td className="h-12 px-2 text-md transition duration-300 border-t first:border-l-0 border-green-700">
                                <label className="text-green-900 text-md font-bold">{(amt).toFixed(2)}</label>
                            </td>
                        </tr>
                        <tr>

                            <td className="h-12 px-2 text-md text-right transition duration-300 border-t border-l first:border-l border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                <label className="text-green-900 text-md font-bold">CGST: </label>
                            </td>
                            <td className="h-12 px-2 text-md transition duration-300 border-t first:border-l-0 border-green-700">
                                <label className="text-green-900 text-md font-bold">{(amt * 0.06).toFixed(2)}</label>
                            </td>
                        </tr>
                        <tr>

                            <td colSpan={6} rowSpan={2} className="h-12 px-2 text-md transition duration-300 border-t border-l first:border-l border-green-700 first-letter:uppercase text-center align-top">
                                <label className="text-green-900 text-md font-bold">For Swastik Pharma</label>
                            </td>

                            <td className="h-12 px-2 text-md text-right transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                <label className="text-green-900 text-md font-bold">SGST: </label>
                            </td>
                            <td className="h-12 px-2 text-md transition duration-300 border-t first:border-l-0 border-green-700">
                                <label className="text-green-900 text-md font-bold">{(amt * 0.06).toFixed(2)}</label>
                            </td>
                        </tr>
                        <tr>

                            <td className="h-12 text-md text-right transition duration-300 border-t border-l first:border-l border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                <label className="text-green-900 text-lg font-bold">Amount: </label>
                            </td>
                            <td className="h-12 px-2 text-md transition duration-300 border-t first:border-l-0 border-green-700">
                                <label className="text-green-900 text-lg font-bold underline decoration-double">{Math.round(amt + 2 * (amt * 0.06)).toFixed(2)}</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap text-center justify-center" onClick={() => storeBills()}>
                <div to={'/billdetails'} className="p-4 cursor-pointer">
                    <div className="border bg-yellow-100 hover:bg-yellow-50 border-green-700 px-4 py-3 rounded-xl flex" >
                        <div className="text-green-700 w-12 h-12 inline-block" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-download">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                        </div>
                        <p className="text-green-700 text-2xl font-bold m-2">Download</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakeBill