import Layout from "../../components/layout/Layout"
import { Link } from "react-router-dom"

function Home() {
    return (
        <Layout>
            <div className="flex flex-wrap m-5 text-center justify-center mt-20">
                <Link to={'/chemistdetails'} className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className="border bg-yellow-100 hover:bg-yellow-50 border-green-700 px-4 py-3 rounded-xl" >
                        <div className="text-green-700 w-12 h-12 mb-3 inline-block" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50} height={50} viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-user">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <p className="text-green-700 text-2xl font-bold" >Chemist Details</p>
                    </div>
                </Link>
                <Link to={'/medicinedetails'} className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className="border bg-yellow-100 hover:bg-yellow-50 border-green-700 px-4 py-3 rounded-xl" >
                        <div className="text-green-700 w-12 h-12 mb-3 inline-block" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-pill">
                                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                                <path d="m8.5 8.5 7 7" />
                            </svg>
                        </div>
                        {/* <h2 className="title-font font-medium text-3xl text-green-700 fonts" >10</h2> */}
                        <p className="text-green-700 text-2xl font-bold" >Medicine Details</p>
                    </div>
                </Link>
            </div>
            <div className="flex flex-wrap m-5 text-center justify-center">
                <Link to={'/inventorydetails'} className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className="border bg-yellow-100 hover:bg-yellow-50 border-green-700 px-4 py-3 rounded-xl" >
                        <div className="text-green-700 w-12 h-12 mb-3 inline-block" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-briefcase-medical">
                                <path d="M12 11v4" />
                                <path d="M14 13h-4" />
                                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                <path d="M18 6v14" />
                                <path d="M6 6v14" />
                                <rect width="20" height="14" x="2" y="6" rx="2" />
                            </svg>
                        </div>
                        <p className="text-green-700 text-2xl font-bold" >View Inventory</p>
                    </div>
                </Link>
                <Link to={'/billdetails'} className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className="border bg-yellow-100 hover:bg-yellow-50 border-green-700 px-4 py-3 rounded-xl" >
                        <div className="text-green-700 w-12 h-12 mb-3 inline-block" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-clipboard-list">
                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <path d="M12 11h4" />
                                <path d="M12 16h4" />
                                <path d="M8 11h.01" />
                                <path d="M8 16h.01" />
                            </svg>
                        </div>
                        {/* <h2 className="title-font font-medium text-3xl text-green-700 fonts" >10</h2> */}
                        <p className="text-green-700 text-2xl font-bold" >View Bills</p>
                    </div>
                </Link>
            </div>
        </Layout>
    )
}

export default Home