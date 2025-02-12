import {motion} from "framer-motion"

const BoxLayout = ({children, title}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className="w-auto min-w-150  mx-auto py-6 px-10 bg-light shadow-md rounded-lg mt-10 border-3 border-dark h-min">
            <h1 className="text-2xl text-center font-black capitalize text-primary mb-4">{title}</h1>
            {children}
        </motion.div>
    )
}
export default BoxLayout
