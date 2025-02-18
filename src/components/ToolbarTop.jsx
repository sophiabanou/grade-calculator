import {LanguageToggle, ThemeToggle} from "./index.jsx";

const ToolbarTop = () => {
    return (
        <>
            <div className="dark:bg-gray-900 absolute top-0 left-0 flex items-center justify-between bg-light w-full px-5 light-shadow py-[2px]">
                <LanguageToggle/>
                <ThemeToggle/>
            </div>

        </>
    )
}
export default ToolbarTop
