import {Outlet} from "react-router-dom";
import {Header} from "../components/index.jsx";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-screen bg-prim font-geologica">
            <Header/>
            <Outlet/>
        </div>
    );
}
export default Layout;
