import {LanguageToggle, ThemeToggle} from "./index.jsx";
import {motion} from "framer-motion";

const ToolbarTop = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="dark:bg-gray-900 absolute top-0 left-0 flex items-center justify-between bg-light w-full px-5 light-shadow py-[2px]">
                <LanguageToggle/>
                <ThemeToggle/>
            </motion.div>

        </>
    )
}
export default ToolbarTop
