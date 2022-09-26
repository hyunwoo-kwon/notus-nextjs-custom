import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer";
// import Sidebar from "./SideBar";


export default function Layout({ children }) {

    return (
        <>
            <div className="bg-primary">
                <IndexNavbar fixed />
                {/* <Sidebar /> */}
                <div> {children} </div>
                <Footer fixed />
            </div>
        </>
    );
}