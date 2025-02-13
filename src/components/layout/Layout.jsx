/* eslint-disable react/prop-types */
import Footer from "../footer/Footer";
import Header from "../header/Header";

function Layout({children}) {
    return (
        <>
            <Header />
            <div className="main-content min-h-screen">{children}</div>
            <Footer />
        </>
    )
}

export default Layout