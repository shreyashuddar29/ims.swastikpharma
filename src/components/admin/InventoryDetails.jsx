import { useContext } from "react"
import context from "../../context/context"

function InventoryDetails() {

    const {getAllMedicine} = useContext(context)

    return (
    <>
        <h1 className="text-center font-bold text-5xl text-green-700 mt-10 mb-10">Inventory Details</h1>

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
                    </tr>
                    {getAllMedicine.map((item, index) => {
                        return (
                            <tr key={index} className="text-center text-md font-semibold">
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {index + 1}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.mfr}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.name}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.hsn}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.pack}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.batch}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.exp}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.stock}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.mrp}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.trp}
                                </td>
                                <td className={item.stock > 10 ? "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-slate-500 text-slate-500" : "h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-700 stroke-red-500 text-red-500"}>
                                    {item.gst}
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

export default InventoryDetails