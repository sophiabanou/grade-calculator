import PropTypes from "prop-types";
import {AnimatePresence, motion} from "framer-motion";
import { Button } from "./index.jsx";
import {useState, useEffect, useRef} from "react";
import { RiFilter3Line, RiArrowUpLongLine, RiArrowDownLongLine } from "@remixicon/react";

const Sort = ({ sortBy = "alphabet", setSortBy, sortDirection = "asc", setSortDirection }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                variant={2}
                caption={`Sort by: ${sortBy === "alphabet" ? "Alphabet" : sortBy === "grade" ? "Grade" : "Credits"} (${sortDirection === "asc" ? "↑" : "↓"})`}
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
                        className="absolute top-12 left-0 bg-white shadow-xl rounded border-1 border-dark w-48 z-10000"
                    >
                        <ul>
                            <li
                                className="max-md:text-sm p-2 cursor-pointer text-dark hover:bg-gray-100 lin-transition flex justify-between items-center border-b-1 border-dark"
                                onClick={() => handleSortChange("alphabet")}
                            >
                                Αλφαβητικά (Α-Ζ)

                                <div className="text-primary">
                                    {sortBy === "alphabet" && (sortDirection === "asc" ? <RiArrowUpLongLine size={16}/> : <RiArrowDownLongLine size={16}/>)}
                                </div>

                            </li>
                            <li
                                className="max-md:text-sm p-2 cursor-pointer text-dark hover:bg-gray-100 lin-transition flex justify-between items-center border-b-1 border-dark"
                                onClick={() => handleSortChange("grade")}
                            >
                                By Grade

                                <div className="text-primary">
                                    {sortBy === "grade" && (sortDirection === "asc" ? <RiArrowUpLongLine size={16}/> : <RiArrowDownLongLine size={16}/>)}
                                </div>

                            </li>
                            <li
                                className="max-md:text-sm p-2 cursor-pointer text-dark hover:bg-gray-100 lin-transition flex justify-between items-center"
                                onClick={() => handleSortChange("credits")}
                            >
                                By Credits

                                <div className="text-primary">
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
