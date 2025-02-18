import {LanguageToggle} from "./index.jsx";

const ToolbarTop = () => {
    return (
        <>
            <div className="absolute top-0 left-0 flex items-center bg-light w-full px-5 light-shadow">
                <LanguageToggle/>
            </div>

        </>
    )
}
export default ToolbarTop
