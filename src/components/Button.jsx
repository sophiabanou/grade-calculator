import {AnimatePresence, motion} from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const Button = ({ Icon, disabled = false, handler, caption }) => {
    const [showCaption, setShowCaption] = useState(false);

    const handleMouseEnter = () => {
        setTimeout(() => setShowCaption(true), 1000);
    };

    const handleMouseLeave = () => {
        setShowCaption(false);
    };

    return (
        <div className="inline-block relative">
            <motion.button
                whileTap={{ scale: 0.9 }}
                disabled={disabled}
                onClick={handler}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative ${disabled ? "bg-gray-200" : "bg-dark hover:bg-primary hover:cursor-pointer"} text-white rounded-full w-7 h-7 flex justify-center items-center transition duration-200`}
            >
                <Icon size={18} />

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
};

export default Button;
