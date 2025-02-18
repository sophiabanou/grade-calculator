import {useLanguageContext} from "../context/Hooks";

const LanguageToggle = () => {
    const {language, setLanguage} = useLanguageContext();

    const handleToggleLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    }

    return (
        <>
            <div className="flex gap-1">
                <button
                    className={`max-md:text-sm text-gray-300 w-5 p-1 rounded cursor-pointer uppercase  hover:text-primary hover:underline lin-transition ${language==='el' ? "text-primary font-semibold" : "text-gray-300"}`}
                    onClick={()=> {
                        handleToggleLanguage("el")}}
                >
                    ελ
                </button>

                <button
                    className={`max-md:text-sm text-gray-300 w-5 p-1 rounded cursor-pointer uppercase  hover:text-primary hover:underline lin-transition ${language==='en' ? "text-primary font-semibold" : "text-gray-300"}`}
                    onClick={()=> {
                        handleToggleLanguage("en")}}
                >
                    en
                </button>
            </div>
        </>
    )
}
export default LanguageToggle
