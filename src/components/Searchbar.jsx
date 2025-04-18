import PropTypes from "prop-types";
import { useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { Button } from "./index.jsx";
import {useLanguageContext} from "../context/Hooks";

const Searchbar = ({ setSearchQuery }) => {
    const {languageData} = useLanguageContext();
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
        <div className="relative flex items-center">
            <Button variant={isExpanded ? 3 : 2} Icon={RiSearchLine} handler={handleButtonClick} caption={languageData?.search?.caption} />

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
                    placeholder={languageData?.search?.placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="dark:bg-dmode-input dark:border-dmode-input dark:placeholder-dark-grey dark:text-light max-h-10 ml-2 p-2 pl-4 pr-10 bg-light rounded border-1 border-dark outline-none lin-transition
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
