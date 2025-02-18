import {useThemeContext} from "../context/Hooks";
import {RiSunLine, RiMoonLine} from "@remixicon/react"
import {motion, AnimatePresence} from "framer-motion";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useThemeContext();

    return (
        <>
            <div className="flex gap-1">

                <button
                    className={`max-md:text-sm p-1 rounded cursor-pointer lin-transition ${theme==='dark' ? "text-blue-500 " : "text-orange-500"}`}
                    onClick={toggleTheme}
                >
                    <AnimatePresence >
                    {
                        theme==='dark' ? (
                            <RiMoonLine size={21}/>
                        ) : (
                            <RiSunLine size={21}/>
                        )
                    }
                    </AnimatePresence>

                </button>
            </div>
        </>
    )
}
export default ThemeToggle
