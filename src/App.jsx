import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}