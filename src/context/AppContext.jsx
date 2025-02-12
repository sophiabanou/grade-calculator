import {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

const AppContext = createContext(null);

export const AppProvider = props => {

    const [classes, setClasses] = useState(() => {
        const savedClasses = localStorage.getItem("classes");
        return savedClasses ? JSON.parse(savedClasses) : [];
    });

    const location = useLocation();

    let isAbout;
    useEffect(() => {
        isAbout = location.pathname.includes("about");
        console.log(isAbout);
    }, [location])

    // export - import handling
    const [expDisabled, setExpDisabled] = useState(false);
    const [impDisabled, setImpDisabled] = useState(false);

    useEffect(() => {
        setExpDisabled(classes?.length === 0 || isAbout );
        setImpDisabled(isAbout);
    },[classes, setClasses, location])

    const value = {
        classes,
        setClasses,
        expDisabled,
        impDisabled,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);