import { HashRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import LanguageProvider from "./context/LanguageProvider";
import ThemeProvider from "./context/ThemeProvider";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";


export default function App() {
    return (
        <HashRouter>
            <AppProvider>
                <LanguageProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="about" element={<About />} />
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </LanguageProvider>
            </AppProvider>
        </HashRouter>
    );
}
