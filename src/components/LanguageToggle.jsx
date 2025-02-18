import useLanguageContext from "../context/useLanguageContext";

const LanguageToggle = () => {
    const {language, setLanguage} = useLanguageContext();

    const handleToggleLanguage = () => {
        const newLanguage = language === 'el' ? 'en' : 'el';
        setLanguage(newLanguage);
    }

    return (
        <>
            <div className="flex gap-1">
                <button
                    className={`max-md:text-sm text-gray-300 w-5 p-1 rounded cursor-pointer uppercase  hover:text-primary hover:underline lin-transition ${language==='el' ? "text-primary font-semibold" : "text-gray-300"}`}
                    onClick={handleToggleLanguage}>
                    el
                </button>

                <button
                    className={`max-md:text-sm text-gray-300 w-5 p-1 rounded cursor-pointer uppercase  hover:text-primary hover:underline lin-transition ${language==='en' ? "text-primary font-semibold" : "text-gray-300"}`}
                    onClick={handleToggleLanguage}>
                    en
                </button>
            </div>
        </>
    )
}
export default LanguageToggle
