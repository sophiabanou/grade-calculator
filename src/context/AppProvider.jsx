import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fixedCoursesData } from "../data";
import PropTypes from "prop-types";
import AppContext from "./AppContext"

export const AppProvider = ({ children }) => {
    const [isAbout, setIsAbout] = useState(false);

    // retrieve courses from local storage
    const [fixedCourses, setFixedCourses] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("fixedCourses"));
        return saved || fixedCoursesData;
    });

    const [userCourses, setUserCourses] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("userCourses"));
        return saved || [];
    });

    // courses count, used to generate course ID
    const [courseCount, setCourseCount] = useState(101 + userCourses.length);

    // all courses appended with an indication for fixed courses
    const [allCourses, setAllCourses] = useState([
        ...userCourses,
        ...fixedCourses.map((fc) => ({ ...fc, isFixed: true })),
    ]);


    // clears local storage. uncomment and comment the useEffect below
    // useEffect(() => {
    //     localStorage.clear();
    // }, [])

    // save classes to local storage and update allCourses
    useEffect(() => {
        localStorage.setItem("userCourses", JSON.stringify(userCourses));
        localStorage.setItem("fixedCourses", JSON.stringify(fixedCourses))
        setAllCourses([
            ...userCourses,
            ...fixedCourses.map((fc) => ({ ...fc, isFixed: true })),
        ]);
    }, [userCourses, fixedCourses]);

    // check if the current URL is "about"
    const location = useLocation();
    useEffect(() => {
        setIsAbout(location.pathname.includes("about"));
    }, [location.pathname]);

    // export - import handling
    const [expDisabled, setExpDisabled] = useState(false);
    const [impDisabled, setImpDisabled] = useState(false);

    useEffect(() => {
        setExpDisabled(isAbout);
        setImpDisabled(isAbout);
    }, [isAbout]);

    const value = {
        userCourses,
        setUserCourses,
        expDisabled,
        impDisabled,
        fixedCourses,
        setFixedCourses,
        courseCount,
        setCourseCount,
        allCourses
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppProvider;
