import {useCallback, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { fixedCoursesData } from "../data";
import PropTypes from "prop-types";
import {AppContext, LanguageContext, ThemeContext} from "./Context";

// ------APP PROVIDER------
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
    useEffect(() => {
        localStorage.clear();
    }, [])

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
    // const location = useLocation();
    // useEffect(() => {
    //     setIsAbout(location.pathname.includes("about"));
    // }, [location.pathname]);

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

// ------LANGUAGE PROVIDER------

// function to detect the user's preferred language
function getBrowserLocales(options = {}) {
    const defaultOptions = {
        languageCodeOnly: false,
    };

    const opt = {
        ...defaultOptions,
        ...options,
    };

    const browserLocales =
        navigator.languages === undefined ? [navigator.language] : navigator.languages;

    console.log(browserLocales);

    if (!browserLocales) {
        return undefined;
    }

    return browserLocales.map(locale => {
        const trimmedLocale = locale.trim();
        return opt.languageCodeOnly ? trimmedLocale.split(/[-_]/)[0] : trimmedLocale;

    });
}


export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState(() => {
        // if there is a stored language return it, otherwise use the user's preferred languages
        const storedLanguage = localStorage.getItem("language");
        if(storedLanguage) {
            return storedLanguage;
        }

        const preferredLanguages = getBrowserLocales({ languageCodeOnly: true });
        return preferredLanguages.find(lang => lang === 'en' || lang === 'el') || 'el';
    });

    const [languageData, setLanguageData] = useState({});

    const fetchLanguageData = useCallback(() => {
        const dataUrl = `locales/${language}.json`;

        fetch(dataUrl)
            .then((response) => response.json())
            .then((data) => setLanguageData(data))
            .catch((error) => console.error('Error fetching language data:', error));
    }, [language]); // Add 'language' to the dependency array

    useEffect(() => {
        fetchLanguageData();
        localStorage.setItem('language', language);
    }, [fetchLanguageData, language]);


    const value = {
        language,
        setLanguage,
        languageData,
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



// ------THEME PROVIDER------
export const ThemeProvider = ({ children }) => {

    const savedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(savedTheme || "light");

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // Automatically set to dark mode if the system is set to dark
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;

}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
