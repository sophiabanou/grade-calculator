import PropTypes from "prop-types";
import {AnimatePresence, motion} from "framer-motion";
import { Button } from "./index.jsx";
import {useState, useRef} from "react";
import { RiFilter3Line, RiArrowUpLongLine, RiArrowDownLongLine } from "@remixicon/react";
import useLanguageContext from "../context/useLanguageContext.jsx";

const Sort = ({ sortBy = "alphabet", setSortBy, sortDirection = "asc", setSortDirection }) => {
    const {languageData} = useLanguageContext();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // handle sort
    const handleSortChange = (newSortOption) => {
        if (newSortOption === sortBy) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortDirection("asc");
        }
        setSortBy(newSortOption);
    };

    return (
        <motion.div
            className="relative mr-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Button
                variant={isOpen? 3 : 2}
                caption={`${languageData?.sort?.caption?.sort}: ${
                    sortBy === "alphabet"
                        ? languageData?.sort?.caption?.alphabet
                        : sortBy === "grade"
                            ? languageData?.sort?.caption?.grade
                            :  languageData?.sort?.caption?.credits
                } (${sortDirection === "asc" ? "↑" : "↓"})`}
                handler={() => setIsOpen(prev => !prev)} // Toggle dropdown visibility
                Icon={RiFilter3Line}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
                        className="dark:bg-dmode-input dark:border-dmode-input absolute top-12 left-0 bg-light shadow-xl rounded border-1 border-dark w-48 z-10000"
                    >
                        <ul>
                            <li
                                className="dark:hover:bg-dmode-input-l dark:text-dark-grey dark:font-light dark:border-dmode-border max-md:text-sm py-2 px-4  cursor-pointer text-dark hover:bg-gray-100 rounded-t lin-transition flex justify-between items-center border-b-1 border-dark"
                                onClick={() => handleSortChange("alphabet")}
                            >
                                {languageData?.sort?.dropdown?.alphabet}

                                <div className="text-primary dark:text-dark-primary">
                                    {sortBy === "alphabet" && (sortDirection === "asc" ? <RiArrowUpLongLine size={16}/> : <RiArrowDownLongLine size={16}/>)}
                                </div>

                            </li>
                            <li
                                className="dark:hover:bg-dmode-input-l dark:text-dark-grey dark:font-light dark:border-dmode-border max-md:text-sm py-2 px-4  cursor-pointer text-dark hover:bg-gray-100 lin-transition  flex justify-between items-center border-b-1 border-dark"
                                onClick={() => handleSortChange("grade")}
                            >
                                {languageData?.sort?.dropdown?.grade}

                                <div className="text-primary dark:text-dark-primary">
                                    {sortBy === "grade" && (sortDirection === "asc" ? <RiArrowUpLongLine size={16}/> : <RiArrowDownLongLine size={16}/>)}
                                </div>

                            </li>
                            <li
                                className="dark:hover:bg-dmode-input-l dark:text-dark-grey dark:font-light dark:border-dmode-border max-md:text-sm py-2 px-4 cursor-pointer text-dark hover:bg-gray-100 lin-transition rounded-b flex justify-between items-center"
                                onClick={() => handleSortChange("credits")}
                            >
                                {languageData?.sort?.dropdown?.credits}

                                <div className="text-primary dark:text-dark-primary">
                                    {sortBy === "credits" && (sortDirection === "asc" ? <RiArrowUpLongLine size={16}/> : <RiArrowDownLongLine size={16}/>)}
                                </div>

                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

Sort.propTypes = {
    sortBy: PropTypes.oneOf(["alphabet", "grade", "credits"]),
    setSortBy: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(["asc", "desc"]),
    setSortDirection: PropTypes.func.isRequired,
};

export default Sort;
