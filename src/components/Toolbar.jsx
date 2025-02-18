import PropTypes from "prop-types";
import {Button, Filter, Searchbar, Sort} from "./index.jsx";
import {RiFilter2Line} from "@remixicon/react";
import {categories, statusOptions} from "../data/index.jsx";
import {useState} from "react";
import { motion } from "framer-motion";
import {useLanguageContext} from "../context/Hooks";

const Toolbar = ({ selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus, setSearchQuery,
                     sortBy ="alphabet", setSortBy, sortDirection="asc",setSortDirection }) => {
    const {languageData} = useLanguageContext();
    // handle filter animation
    const [filtersAreExpanded, setFiltersAreExpanded] = useState(false);
    const handleFilterButtonClick = () => {
        setFiltersAreExpanded((prev) => !prev);
    }

    return (
        <>
            <div className="p-2 mb-4 flex flex-wrap gap-2">

                <div className="dark:border-dmode-border flex justify-start w-full p-3 items-center border-1 rounded border-gray-100 gap-5 flex-wrap">

                    <Searchbar setSearchQuery={setSearchQuery} />


                    <div className="flex w-auto gap-2 ">
                        <Button variant={filtersAreExpanded ? 3 : 2} Icon={RiFilter2Line} handler={handleFilterButtonClick} caption={languageData?.toolbar?.caption} />

                        <motion.div
                            className="overflow-x-hidden flex gap-3"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: filtersAreExpanded
                                    ? window.innerWidth >= 1536 ? "28vw"
                                        :window.innerWidth >= 1280 ? "31vw"
                                                :window.innerWidth >= 900 ? "32vw"
                                                    :window.innerWidth >= 768 ? "34vw"
                                                        : window.innerWidth >= 640 ? "39vw"
                                                            : window.innerWidth >= 500 ? "40vw"
                                                               : "45vw"
                                    : 0,
                                maxWidth: filtersAreExpanded ? "600px" : "0px",
                                opacity: filtersAreExpanded ? 1 : 0,
                            }} transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Filter selectedOption={selectedCategory} setSelectedOption={setSelectedCategory} data={categories} title={languageData?.toolbar?.category}/>
                            <Filter selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} data={statusOptions} title={languageData?.toolbar?.status} />
                        </motion.div>

                    </div>

                    <Sort sortBy={sortBy} setSortBy={setSortBy} sortDirection={sortDirection} setSortDirection={setSortDirection} />



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
    sortBy: PropTypes.oneOf(["alphabet", "grade", "credits"]),
    setSortBy: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(["asc", "desc"]),
    setSortDirection: PropTypes.func.isRequired,
}

export default Toolbar

