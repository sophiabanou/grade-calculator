import PropTypes from "prop-types";
import {Button, Filter, Searchbar, ShowMyCourses, Sort} from "./index.jsx";
import {useRef} from "react";
import {RiFilter2Line} from "@remixicon/react";
import {categories, statusOptions} from "../data/index.jsx";
import { motion, AnimatePresence} from "framer-motion";
import {useLanguageContext, useAppContext} from "../context/Hooks";

const Toolbar = ({ selection, updateSelection, setSearchQuery,
                     sortBy ="alphabet", setSortBy, sortDirection="asc",setSortDirection }) => {
    const {languageData} = useLanguageContext();
    const {sortOpen, setSortOpen, filtersOpen, setFiltersOpen} = useAppContext();
    const dropdownFRef = useRef(null);

    const majors = ["shared", "A", "B"];
    const specs = ["S1", "S2", "S3", "S4", "S5", "S6"];

    const handleFilterButtonClick = () => {
        if(sortOpen) {
            setSortOpen(false);
        }
        setFiltersOpen((prev) => !prev);
    }

    return (
        <>
            <div className="p-2 mb-4 flex flex-wrap gap-2">

                <div className="dark:border-dmode-border flex justify-start w-full p-3 items-center border-1 rounded border-gray-100 gap-5 flex-wrap">

                    <Searchbar setSearchQuery={setSearchQuery} />


                    <div className="flex w-auto gap-2 relative">
                        <Button variant={filtersOpen ? 3 : 2} Icon={RiFilter2Line} handler={handleFilterButtonClick} caption={languageData?.toolbar?.caption} />

                        <AnimatePresence>
                            {
                                filtersOpen ? (
                                    <motion.div
                                        ref={dropdownFRef}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
                                        className="dark:bg-dmode dark:border-dmode-border overflow-x-hidden flex flex-col items-center gap-3 bg-light absolute left-0 top-12 z-50000 border-1 shadow-xl rounded border-dark p-3"
                                    >
                                        <h3 className="max-md:text-sms font-bold text-primary">{languageData?.toolbar?.filters}</h3>
                                        <Filter selectedOption={selection.category} setSelectedOption={(value) => updateSelection("category", value)}  data={categories} title={languageData?.toolbar?.category}/>
                                        <Filter selectedOption={selection.status} setSelectedOption={(value) => updateSelection("status", value)} data={statusOptions} title={languageData?.toolbar?.status} />
                                        <Filter selectedOption={selection.major} setSelectedOption={(value) => updateSelection("major", value)} data={majors} title={languageData?.toolbar?.major} />
                                        <Filter selectedOption={selection.spec} setSelectedOption={(value) => updateSelection("spec", value)} data={specs} title={languageData?.toolbar?.spec} />

                                    </motion.div>
                                ) : null
                            }
                        </AnimatePresence>


                    </div>

                    <Sort sortBy={sortBy} setSortBy={setSortBy} sortDirection={sortDirection} setSortDirection={setSortDirection} />

                    <ShowMyCourses/>

                </div>

            </div>
        </>
    )
}

Toolbar.propTypes = {
    selection: PropTypes.object.isRequired,
    updateSelection: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    sortBy: PropTypes.oneOf(["alphabet", "grade", "credits"]),
    setSortBy: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(["asc", "desc"]),
    setSortDirection: PropTypes.func.isRequired,
}

export default Toolbar

