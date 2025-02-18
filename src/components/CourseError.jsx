import {motion, AnimatePresence} from "framer-motion";
import PropTypes from "prop-types";

const CourseError = ({message, error}) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.span
                    className="text-red-700 dark:text-red-500 text-sm font-medium max-md:text-sm"
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

CourseError.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
};

export default CourseError
