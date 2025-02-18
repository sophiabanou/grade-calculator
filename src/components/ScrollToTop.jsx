import {RiArrowUpCircleFill} from "@remixicon/react";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <motion.button
                className="max-md:right-2 max-md:bottom-6 fixed bottom-10 right-10 z-50 text-dark dark:text-light cursor-pointer"
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <RiArrowUpCircleFill size={33} />
            </motion.button>
        </>
    )
}
export default ScrollToTop
