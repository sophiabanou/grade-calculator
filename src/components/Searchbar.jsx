import PropTypes from "prop-types";
import { useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { Button2 } from "./index.jsx";

const Searchbar = ({ setSearchQuery }) => {
    const [search, setSearch] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

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
            <Button2 Icon={RiSearchLine} handler={handleButtonClick} caption="Αναζήτηση Μαθημάτων" />

            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                    width: isExpanded
                        ? (window.innerWidth >= 1536 ? "61vw"
                            : window.innerWidth >= 1280? "51vw"
                                : window.innerWidth >= 1024 ? "45vw"
                                    : window.innerWidth >= 768 ? "31vw"
                                        : window.innerWidth >= 640 ? "21vw"
                                            : "15vw")
                        : 0,
                    maxWidth: isExpanded ? "320px" : 0, // Ensures max width stays at 320px
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
                        w-[60vw] max-2xl:w-[50vw] max-xl:w-[40vw] max-lg:w-[30vw] max-md:w-[20vw] max-sm:w-[15vw] max-w-[320px]"
                />
            </motion.div>
        </div>
    );
};

Searchbar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
};

export default Searchbar;
