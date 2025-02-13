import { useContext } from "react"
import context from "../../context/context"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"
import toast from "react-hot-toast"

function BillDetails() {

    const { getAllBill } = useContext(context)

    const deleteBill = async (id, name) => {
        const ack = confirm(`Are you sure that you want to delete invoice of ${name} from the database`)
        if (ack) {
            try {
                await deleteDoc(doc(db, 'bill', id))
                toast.success("Bill deteled successfully")
            } catch (error) {
                console.error("Error in deleting bill", error)
            }
        }
    }

    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Bill Details</h1>

            <div className="w-full overflow-x-auto mt-5 p-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-green-700 text-pink-400" >
                    <tbody>
                        <tr className="text-center">
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Bill No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Chemist</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Address</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Amount</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Delete</th>
                        </tr>
                        {getAllBill.map((item, index) => {
                            return (
                                <tr key={index} className="text-pink-300 text-center text-md font-semibold">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 ">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.date}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.billno}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.chemist}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.amt}
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
                                        onClick={() => deleteBill(item.id, item.chemist)}>
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

export default BillDetails