import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ProgressBar = ({ totalCredits, degreeCredits, creditsProgress }) => {
    const [prevProgress, setPrevProgress] = useState(0);

    useEffect(() => {
        if (creditsProgress !== prevProgress) {
            setPrevProgress(creditsProgress);
        }
    }, [creditsProgress, prevProgress]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.2,
            }}
            className="mt-20 fixed bottom-0 w-full flex flex-col items-start z-50"
        >

            <p className="font-semibold text-light text-center text-lg rounded-tr px-8 py-1 w-auto gap-3 bg-dark flex flex-row shadow-md">
                <span className="font-bold">Πρόοδος:</span>
                <span>{totalCredits} / {degreeCredits}</span>
            </p>

            <div className="w-full bg-light h-5 overflow-hidden relative shadow-md">
                <div
                    className="h-full bg-primary relative overflow-hidden transition-all"
                    style={{ width: `${creditsProgress}%` }}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-[length:40px_40px]
                        bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

ProgressBar.propTypes = {
    totalCredits: PropTypes.number.isRequired,
    degreeCredits: PropTypes.number.isRequired,
    creditsProgress: PropTypes.number.isRequired,
};

export default ProgressBar;
