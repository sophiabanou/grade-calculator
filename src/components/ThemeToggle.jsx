import useThemeContext from "../context/useThemeContext.jsx";
import {RiSunLine, RiMoonLine} from "@remixicon/react"
import {motion, AnimatePresence} from "framer-motion";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useThemeContext();

    return (
        <>
            <div className="flex gap-1">
                {/*<button*/}
                {/*    className={`max-md:text-sm text-dark p-1 rounded cursor-pointer uppercase  hover:text-primary lin-transition ${theme==='light' ? "text-primary font-semibold" : "text-gray-300"}`}*/}
                {/*    onClick={toggleTheme}*/}
                {/*>*/}

                {/*</button>*/}

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
