import useAppContext from "../context/useAppContext.jsx"

const LanguageSwitcher = () => {
    const { language, setLanguage } = useAppContext();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "gr" : "en");
    };

    return (
        <button onClick={toggleLanguage} className="p-2 bg-dark text-light rounded">
            {language === "en" ? "Ελληνικά" : "English"}
        </button>
    );
};

export default LanguageSwitcher;
