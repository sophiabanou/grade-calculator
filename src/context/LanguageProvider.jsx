import LanguageContext from "./LanguageContext.jsx";
import PropTypes from "prop-types";
import {useEffect, useState, useCallback} from "react";

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

export default LanguageProvider;

