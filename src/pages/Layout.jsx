import {Outlet} from "react-router-dom";
import {Header} from "../components";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-screen font-geologica">
            <div className="bg-prim"></div>
            <Header/>
            <Outlet/>
        </div>
    );
}
export default Layout;
