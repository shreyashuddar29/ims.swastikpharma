/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase/config"
import toast from "react-hot-toast"

function UpdateProduct() {

    const navigate = useNavigate()
    const { id } = useParams()

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

    const getSingleChemist = async () => {
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

    const updateChemistFunction = async () => {
        try {
            await setDoc(doc(db, 'chemist', id), chemist)
            toast.success("Chemist details updated")
            navigate('/chemistdetails')
        } catch (error) {
            console.error("Error in updating chemist details ", error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getSingleChemist()
    }, [])


    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Update Chemist</h1>

            <div className="justify-center items-center p-10">
                <div className="login_Form px-10 py-6 border border-green-700 rounded-xl shadow-md">
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={chemist.name}
                            onChange={(e) => {
                                setChemist({ ...chemist, name: e.target.value })
                            }}
                            placeholder="Enter Chemist Name"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Address: </label>
                        <input
                            type="text"
                            name="address"
                            value={chemist.address}
                            onChange={(e) => {
                                setChemist({ ...chemist, address: e.target.value })
                            }}
                            placeholder="Enter Chemist Address"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">GST No.: </label>
                        <input
                            type="text"
                            name="gst"
                            value={chemist.gst}
                            onChange={(e) => {
                                setChemist({ ...chemist, gst: e.target.value })
                            }}
                            placeholder="Enter Chemist GST Number"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">DL No.(1): </label>
                        <input
                            type="text"
                            name="dl1"
                            value={chemist.dl1}
                            onChange={(e) => {
                                setChemist({ ...chemist, dl1: e.target.value })
                            }}
                            placeholder="Enter Chemist DL Number 1"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">DL No.(2): </label>
                        <input
                            type="text"
                            name="dl2"
                            value={chemist.dl2}
                            onChange={(e) => {
                                setChemist({ ...chemist, dl2: e.target.value })
                            }}
                            placeholder="Enter Chemist DL Number 2"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-green-900 text-lg font-bold w-1/10">Phone No.: </label>
                        <input
                            type="text"
                            name="phno"
                            value={chemist.phno}
                            onChange={(e) => {
                                setChemist({ ...chemist, phno: e.target.value })
                            }}
                            placeholder="Enter Chemist Phone Number"
                            className="bg-yellow-50 text-lg text-green-900 border border-green-700 px-2 py-2 w-300 rounded-md outline-none placeholder-green-700"
                        />
                    </div>
                    <div className="mb-3 mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={updateChemistFunction}
                            className="hover:bg-green-700 hover:text-yellow-50 bg-yellow-50 border border-green-700 text-green-700 text-center py-2 w-50 cursor-pointer font-bold rounded-md text-xl"
                        >
                            Update Chemist
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateProduct