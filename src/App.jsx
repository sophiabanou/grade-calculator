import { HashRouter, Routes, Route } from "react-router-dom";
import {AppProvider, LanguageProvider, ThemeProvider} from "./context/Providers";
import {Home, About, Layout} from "./pages"


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
