import { useContext } from "react";
import {AppContext, ThemeContext, LanguageContext} from "./Context.jsx";

export const useAppContext = () => {
    return useContext(AppContext);
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const useLanguageContext = () => {
    return useContext(LanguageContext);
};