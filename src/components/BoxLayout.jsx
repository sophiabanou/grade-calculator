import {motion} from "framer-motion"
import PropTypes from "prop-types";

const BoxLayout = ({children, title, index}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 + (index-1)*0.3, duration: 0.5, ease: "easeOut" }}
            className="w-full mx-auto py-6 px-10 bg-light shadow-md rounded-lg mt-10 border-3 border-dark h-min overflow-x-visible max-md:px-5 max-md:py-4">
            <h1 className="text-2xl text-center font-black capitalize text-dark mb-4 max-md:text-xl">{title}</h1>
            {children}
        </motion.div>
    )
}

BoxLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}

export default BoxLayout

