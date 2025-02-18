import { useContext } from "react";
import LanguageContext from "./LanguageContext";

const useLanguageContext = () => {
    return useContext(LanguageContext);
};

export default useLanguageContext;
