import { useContext } from "react";
import ThemeContext from "./ThemeContext"; // Import the context

const useThemeContext = () => {
    return useContext(ThemeContext);
};

export default useThemeContext;
