import PropTypes from "prop-types";
import { useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { Button } from "./index.jsx";

const Searchbar = ({ setSearchQuery }) => {
    const [search, setSearch] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    // search handlers
    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(search);
        }
    };

    const handleButtonClick = () => {
        setIsExpanded((prev) => !prev);
        if (!isExpanded) {
            document.querySelector("#searchbar").focus();
        }
    };

    return (
        <div className="relative flex gap-2 items-center">
            <Button variant={isExpanded ? 3 : 2} Icon={RiSearchLine} handler={handleButtonClick} caption="Αναζήτηση Μαθημάτων" />

            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                    width: isExpanded
                        ? window.innerWidth <= 768 ? 260
                                : window.innerWidth <= 640 ? 160
                                    : 325
                        : 0,
                    maxWidth: isExpanded ? "325px" : "0px",
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-x-hidden"
            >
                <input
                    type="text"
                    id="searchbar"
                    placeholder="Αναζήτηση..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="max-h-10 ml-2 p-2 pl-4 pr-10 bg-light rounded border-1 border-dark outline-none lin-transition
                        w-[300px] max-md:w-[250px] max-sm:w-[150px] max-w-[320px] max-md:text-sm"
                />
            </motion.div>
        </div>
    );
};

Searchbar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
};

export default Searchbar;
