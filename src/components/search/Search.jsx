import { useContext, useState } from "react"
import context from "../../context/context"

function Search() {

    const {getAllMedicine} = useContext(context)
    const [search, setSearch] = useState("")
    const filterSearchData = getAllMedicine.filter((obj) => obj.batch.includes(search))

    return (
        <>
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
        </>
    )
}

export default Search