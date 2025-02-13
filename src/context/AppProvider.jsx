import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fixedClassesData } from "../data";
import PropTypes from "prop-types";
import AppContext from "./AppContext"; // Import the separate context file

export const AppProvider = ({ children }) => {
    const [isAbout, setIsAbout] = useState(false);

    // Retrieve classes from local storage
    const [fixedClasses, setFixedClasses] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("fixedClasses"));
        return saved || fixedClassesData;
    });

    const [classes, setClasses] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("classes"));
        return saved || [];
    });

    // Classes count, used to generate class ID
    const [classCount, setClassCount] = useState(101 + classes.length);

    // All classes appended with an indication for fixed classes
    const [allClasses, setAllClasses] = useState([
        ...classes,
        ...fixedClasses.map((fc) => ({ ...fc, isFixed: true })),
    ]);

    // Save classes to local storage and update allClasses
    useEffect(() => {
        localStorage.setItem("classes", JSON.stringify(classes));
        localStorage.setItem("fixedClasses", JSON.stringify(fixedClasses)); // Persist fixedClasses changes
        setAllClasses([
            ...classes,
            ...fixedClasses.map((fc) => ({ ...fc, isFixed: true })),
        ]);
    }, [classes, fixedClasses]);

    // Check if the current URL is "about"
    const location = useLocation();
    useEffect(() => {
        setIsAbout(location.pathname.includes("about"));
    }, [location.pathname]); // Use location.pathname instead of location

    // Export - import handling
    const [expDisabled, setExpDisabled] = useState(false);
    const [impDisabled, setImpDisabled] = useState(false);

    useEffect(() => {
        setExpDisabled(classes.length === 0 || isAbout);
        setImpDisabled(isAbout);
    }, [classes, isAbout]); // Removed setClasses and location

    const [componentKey, setComponentKey] = useState(0);

    const value = {
        classes,
        setClasses,
        expDisabled,
        impDisabled,
        fixedClasses,
        setFixedClasses,
        classCount,
        setClassCount,
        allClasses,
        componentKey,
        setComponentKey,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppProvider;
