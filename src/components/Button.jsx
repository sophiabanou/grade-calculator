import {AnimatePresence, motion} from "framer-motion";
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import useThemeContext from "../context/useThemeContext.jsx";

const Button = ({ Icon, disabled = false, handler, caption, variant= 1 }) => {
    const timeoutRef = useRef(null);
    const [showCaption, setShowCaption] = useState(false);
    const {theme} = useThemeContext();

    // mouse handlers
    const handleMouseEnter = () => {
        let delay = 2000;
        if(variant === 2) {
            delay = 3000;
        }
        timeoutRef.current = setTimeout(() => setShowCaption(true), delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setShowCaption(false);
    };

    const handleClick = (e) => {
        clearTimeout(timeoutRef.current);
        setShowCaption(false);
        handler(e);
    };

    return (
        <div className="inline-block relative">
            <motion.button
                whileTap={{ scale: 0.9 }}
                disabled={disabled}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${
                    variant === 1
                        ? (disabled ? "btn1-disabled" : "btn1")
                        : variant === 2
                            ? "btn2"
                            : "btn3"
                }`}
            >
                <Icon
                    size={18}
                    // color={variant === 2 && theme === 'dark'? "#ffffff" : "#151515"}
                />

                <AnimatePresence >
                    {showCaption && !disabled && (
                        <motion.div
                            className="absolute top-[-50px] left-[-80px] bg-dark text-white text-xs rounded px-2 py-1 z-50 max-w-[120px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {caption}
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.button>
        </div>
    );
};

Button.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    disabled: PropTypes.bool,
    handler: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
    variant: PropTypes.oneOf([1, 2, 3]),
};

export default Button;
