import useLanguageContext from "../context/useLanguageContext";

const LanguageToggle = () => {
    const {language, setLanguage} = useLanguageContext();

    const handleToggleLanguage = () => {
        const newLanguage = language === 'gr' ? 'en' : 'gr';
        setLanguage(newLanguage);
    }

    return (
        <>
            <button
                className="bg-dark text-light w-10 h-10 p-2 rounded-full cursor-pointer "
                onClick={handleToggleLanguage}>
                {language}
            </button>
        </>
    )
}
export default LanguageToggle
