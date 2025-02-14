import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationMessage = ({ message, color = "green", isOpen }) => {
    // framer motion variants
    const variants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.5 },
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`z-1000 fixed top-0 left-0 w-full py-4 px-10 flex justify-start items-center max-md:justify-center max-md:py-3 ${
                        color === "green" ? "bg-green-300" : "bg-red-200"
                    } text-dark opacity-95`}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ConfirmationMessage.propTypes = {
    message: PropTypes.string.isRequired,
    color: PropTypes.oneOf(["red", "green"]),
    isOpen: PropTypes.bool.isRequired,
};

export default ConfirmationMessage;
