import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-screen bg-prim font-geologica">
            <Outlet/>
        </div>
    );
}
export default Layout;
