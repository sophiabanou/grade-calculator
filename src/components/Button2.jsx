import {AnimatePresence, motion} from "framer-motion";
import PropTypes from "prop-types";
import { useState , useRef} from "react";

const Button2 = ({ Icon, handler, caption }) => {
    const timeoutRef = useRef(null);
    const [showCaption, setShowCaption] = useState(false);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => setShowCaption(true), 3000);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setShowCaption(false);
    };

    const handleClick = () => {
        clearTimeout(timeoutRef.current);
        setShowCaption(false);
        handler();
    };

    return (
        <div className="inline-block relative">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="z-200 flex justify-center items-center bg-light rounded border-3 border-dark w-10 h-10 p-1 text-dark "
            >
                <Icon size={18} />

                <AnimatePresence >
                    {showCaption&& (
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

Button2.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    handler: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
};

export default Button2;
