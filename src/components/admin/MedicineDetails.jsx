import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import context from "../../context/context"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"
import toast from "react-hot-toast"

// const getAllMedicine = [
//     {
//         mfr: "Agron",
//         name: "Shreyas",
//         hsn: 9099,
//         pack: "10's",
//         batch: "ABC-12",
//         exp: "Jan-24",
//         stock: 50,
//         mrp: 12.00,
//         trp: 9.63,
//         gst: 12,
//     },
//     {
//         mfr: "Agron",
//         name: "huddar",
//         hsn: 9099,
//         pack: "6's",
//         batch: "ABC-12",
//         exp: "Jan-24",
//         stock: 50,
//         mrp: 12.35,
//         trp: 9.63,
//         gst: 12,
//     },
// ]

function MedicineDetails() {

    const navigate = useNavigate()
    const {getAllMedicine} = useContext(context)

    const deleteMedicine = async (id, name) => {
        const ack = confirm(`Are you sure that you want to delete details of ${name} from the database`)
        if (ack) {
            try {
                await deleteDoc(doc(db, 'medicine', id))
                toast.success("Medicine deteled successfully")
            } catch (error) {
                console.error("Error in deleting medicine", error)
            }
        }
    }

    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Medicine Details</h1>

            <div className="flex flex-wrap text-center justify-center">
                <Link to={'/addmedicine'} className="p-4 cursor-pointer">
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
                                className="lucide lucide-badge-plus">
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                                    <line x1="12" x2="12" y1="8" y2="16"/>
                                    <line x1="8" x2="16" y1="12" y2="12"/>
                                </svg>
                        </div>
                        <p className="text-green-700 text-2xl font-bold m-2">Add Medicine</p>
                    </div>
                </Link>
            </div>

            <div className="w-full overflow-x-auto mt-5 p-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-green-700 text-pink-400" >
                    <tbody>
                        <tr className="text-center">
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">MFR</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">HSN</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Pack</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Batch</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Exp Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Stock</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">MRP</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">TRP</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">GST(%)</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Edit</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Delete</th>
                        </tr>
                        {getAllMedicine.map((item, index) => {
                            return (
                                <tr key={index} className="text-pink-300 text-center text-md font-semibold">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 ">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.mfr}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.name}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.hsn}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.pack}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.batch}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.exp}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.stock}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.mrp}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.trp}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.gst}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-green-700 text-green-700 cursor-pointer hover:bg-yellow-100">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="25" 
                                        height="25" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="lucide lucide-file-pen-line m-auto"
                                        onClick={() => navigate(`/updatemedicine/${item.id}`)}>
                                            <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/>
                                            <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
                                            <path d="M8 18h1"/>
                                        </svg>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-700 text-red-700 cursor-pointer hover:bg-yellow-100">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="25" 
                                        height="25" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="lucide lucide-trash-2 m-auto"
                                        onClick={() => deleteMedicine(item.id, item.name)}>
                                            <path d="M3 6h18"/>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                            <line x1="10" x2="10" y1="11" y2="17"/>
                                            <line x1="14" x2="14" y1="11" y2="17"/>
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MedicineDetails