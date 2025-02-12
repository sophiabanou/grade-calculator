import {motion, AnimatePresence} from "framer-motion";

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
export default ClassError
