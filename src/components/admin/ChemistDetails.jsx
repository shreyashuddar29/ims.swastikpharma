import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import context from "../../context/context"

// const getAllChemist = [
//     {
//         name: "Shreyas",
//         address: "tilakwadi belagavi",
//         gst: "123abjsj3345",
//         dl1: "12jekoj23",
//         dl2: "123kfklen",
//         phno: "7894506546"
//     },
//     {
//         cname: "Shreyas",
//         address: "tilakwadi belagavi",
//         gst: "123abjsj3345",
//         dl1: "12jekoj23",
//         dl2: "123kfklen",
//         phno: "7894506546"
//     }
// ]

function ChemistDetails() {

    const { getAllChemist } = useContext(context)

    const navigate = useNavigate()

    return (
        <>
            <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Chemist Details</h1>

            <div className="flex flex-wrap text-center justify-center">
                <Link to={'/addchemist'} className="p-4 cursor-pointer">
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
                                className="lucide lucide-user-plus">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <line x1="19" x2="19" y1="8" y2="14" />
                                <line x1="22" x2="16" y1="11" y2="11" />
                            </svg>
                        </div>
                        <p className="text-green-700 text-2xl font-bold m-2">Add Chemist</p>
                    </div>
                </Link>
            </div>

            <div className="w-full overflow-x-auto mt-5 p-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-green-700 text-pink-400" >
                    <tbody>
                        <tr className="text-center">
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100 font-bold fontPara">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Address</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">GST No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">DL No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">DL No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Phone No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Edit</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-700 text-green-700 bg-yellow-100">Make Bill</th>
                        </tr>
                        {getAllChemist.map((item, index) => {
                            return (
                                <tr key={index} className="text-pink-300 text-center text-md font-semibold">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 ">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.name}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.gst}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.dl1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.dl2}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.phno}
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
                                            onClick={() => navigate(`/updatechemist/${item.id}`)}>
                                            <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                                            <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                            <path d="M8 18h1" />
                                        </svg>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-700 text-green-700 cursor-pointer hover:bg-yellow-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={25}
                                            height={25}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-clipboard-plus m-auto"
                                            onClick={() => navigate(`/makebill/${item.id}`)}>
                                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                            <path d="M9 14h6" />
                                            <path d="M12 17v-6" />
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

export default ChemistDetails