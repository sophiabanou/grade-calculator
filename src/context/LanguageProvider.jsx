import LanguageContext from "./LanguageContext.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState('gr');
    const [languageData, setLanguageData] = useState({});

    const fetchLanguageData = () => {
        const dataUrl =`locales/${language}.json`;

        fetch(dataUrl)
            .then((response) => response.json())
            .then((data) => setLanguageData(data))
            .catch((error) => console.error('Error fetching language data:', error));
    };

    useEffect(() => {
       fetchLanguageData()
    },[language])


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

