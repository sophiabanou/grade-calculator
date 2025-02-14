import PropTypes from "prop-types";
import {Button2, Filter, Searchbar} from "./index.jsx";
import {RiFilter3Line} from "@remixicon/react";
import {categories, statusOptions} from "../data/index.jsx";
import {useState} from "react";
import { motion } from "framer-motion";

const Toolbar = ({ selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus, setSearchQuery}) => {

    const [filtersAreExpanded, setFiltersAreExpanded] = useState(false);
    const handleFilterButtonClick = () => {
        setFiltersAreExpanded((prev) => !prev);
    }

    return (
        <>
            <div className="p-2 mb-4 flex flex-wrap gap-2">

                <div className="flex justify-start w-full p-3 items-center border-1 rounded border-gray-100 gap-5">

                    <Searchbar setSearchQuery={setSearchQuery} />

                    <div className="flex w-auto gap-2 ">
                        <Button2 Icon={RiFilter3Line} handler={handleFilterButtonClick} caption="Φιλτράρισμα Μαθημάτων" />

                        <motion.div
                            className="overflow-x-hidden flex gap-3"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: filtersAreExpanded
                                    ? window.innerWidth >= 1536 ? "28vw"
                                        :window.innerWidth >= 1280 ? "31vw"
                                                :window.innerWidth >= 900 ? "33vw"
                                                    :window.innerWidth >= 768 ? "35vw"
                                                        : window.innerWidth >= 640 ? "40vw"
                                                            : window.innerWidth >= 500 ? "40vw"
                                                               : "45vw"
                                    : 0,
                                maxWidth: filtersAreExpanded ? "670px" : 0, // Ensures max width stays at 320px
                                opacity: filtersAreExpanded ? 1 : 0,
                            }} transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Filter selectedOption={selectedCategory} setSelectedOption={setSelectedCategory} data={categories} title="Επιλέξτε Κατηγορία" hasMisc={true} />
                            <Filter selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} data={statusOptions} title="Επιλέξτε Κατάσταση" />
                        </motion.div>

                    </div>

                </div>

            </div>
        </>
    )
}

Toolbar.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    setSelectedCategory: PropTypes.func.isRequired,
    selectedStatus: PropTypes.string.isRequired,
    setSelectedStatus: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
}

export default Toolbar

