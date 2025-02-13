/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase/config"
import toast from "react-hot-toast"

function UpdateMedicine() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [medicine, setMedicine] = useState({
        mfr: "Agron",
        name: "",
        hsn: 0,
        pack: "",
        batch: "",
        exp: "",
        stock: 0,
        mrp: 0,
        trp: 0,
        gst: 12,
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

    const getSingleMedicine = async () => {
        try {
            const medicineTemp = await getDoc(doc(db, 'medicine', id))
            const medicine = medicineTemp.data()
            setMedicine({
                mfr: medicine?.mfr,
                name: medicine?.name,
                hsn: medicine?.hsn,
                pack: medicine?.pack,
                batch: medicine?.batch,
                exp: medicine?.exp,
                stock: medicine?.stock,
                mrp: medicine?.mrp,
                trp: medicine?.trp,
                gst: medicine?.gst,
                time: medicine?.time,
                date: medicine?.date
            })
        } catch (error) {
            console.error("Error in getting single medicine details", error)
        }
    }

    const updateMedicineFunction = async () => {
        try {
            await setDoc(doc(db, 'medicine', id), medicine)
            toast.success("Medicine details updated")
            navigate('/medicinedetails')
        } catch (error) {
            console.error("Error in updating medicine details", error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getSingleMedicine()
    }, [])

    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Update Medicine</h1>

            <div className="justify-center items-center p-10">
                <div className="login_Form px-10 py-6 border border-green-700 rounded-xl shadow-md">
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">MFR: </label>
                        <input
                            type="text"
                            name="mfr"
                            value={"Agron"}
                            onChange={(e) => {
                                setMedicine({ ...medicine, mfr: e.target.value })
                            }}
                            placeholder="Enter Manufacturer Name"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={medicine.name}
                            onChange={(e) => {
                                setMedicine({ ...medicine, name: e.target.value })
                            }}
                            placeholder="Enter Medicine Name"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">HSN Code: </label>
                        <input
                            type="number"
                            name="hsn"
                            value={medicine.hsn}
                            onChange={(e) => {
                                setMedicine({ ...medicine, hsn: e.target.value })
                            }}
                            placeholder="Enter HSN Code"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Pack: </label>
                        <input
                            type="text"
                            name="pack"
                            value={medicine.pack}
                            onChange={(e) => {
                                setMedicine({ ...medicine, pack: e.target.value })
                            }}
                            placeholder="Enter Pack"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Batch No.: </label>
                        <input
                            type="text"
                            name="batch"
                            value={medicine.batch}
                            onChange={(e) => {
                                setMedicine({ ...medicine, batch: e.target.value })
                            }}
                            placeholder="Enter Batch Number"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Exp Date: </label>
                        <input
                            type="text"
                            name="expdate"
                            value={medicine.exp}
                            onChange={(e) => {
                                setMedicine({ ...medicine, exp: e.target.value })
                            }}
                            placeholder="Enter Expiry Date"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Stock: </label>
                        <input
                            type="number"
                            name="stock"
                            value={medicine.stock}
                            onChange={(e) => {
                                setMedicine({ ...medicine, stock: e.target.value })
                            }}
                            placeholder="Enter Stock"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">MRP: </label>
                        <input
                            type="number"
                            name="mrp"
                            value={medicine.mrp}
                            onChange={(e) => {
                                setMedicine({ ...medicine, mrp: e.target.value })
                            }}
                            placeholder="Enter Medicine MRP"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">TRP: </label>
                        <input
                            type="number"
                            name="trp"
                            value={medicine.trp}
                            onChange={(e) => {
                                setMedicine({ ...medicine, trp: e.target.value })
                            }}
                            placeholder="Enter Medicine TRP"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">GST (%): </label>
                        <input
                            type="number"
                            name="gst"
                            value={medicine.gst}
                            onChange={(e) => {
                                setMedicine({ ...medicine, gst: e.target.value })
                            }}
                            placeholder="Enter GST %"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={updateMedicineFunction}
                            className="hover:bg-green-700 hover:text-yellow-50 bg-yellow-50 border border-green-700 text-green-700 text-center py-2 w-50 cursor-pointer font-bold rounded-md text-xl"
                        >
                            Add Medicine
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateMedicine