import {Outlet} from "react-router-dom";
import {Header, ToolbarTop, Background, Footer} from "../components";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center min-h-screen font-geologica">
            <Background />
            <ToolbarTop/>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}
export default Layout;
