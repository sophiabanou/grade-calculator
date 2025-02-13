import {motion, AnimatePresence} from "framer-motion";
import PropTypes from "prop-types";

const ClassError = ({message, error}) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.span
                    className="text-red-700 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0 }}
                >
                    {message}
                </motion.span>
            )}

        </AnimatePresence>
    )
}

ClassError.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
};

export default ClassError
