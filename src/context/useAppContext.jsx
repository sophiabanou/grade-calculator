import { useContext } from "react";
import AppContext from "./AppContext"; // Import the context

const useAppContext = () => {
    return useContext(AppContext);
};

export default useAppContext;
