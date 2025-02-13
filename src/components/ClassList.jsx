import {useEffect, useState} from "react";
import BoxLayout from "./BoxLayout.jsx";
import useAppContext from "../context/useAppContext.jsx";
import { AnimatePresence } from "framer-motion";
import {ClassItem, Toolbar} from "../components";
import PropTypes from "prop-types";
import {categories} from "../data";

const ClassList = ({ index }) => {
    const { allClasses, componentKey } = useAppContext();

    // State for filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Filter classes based on search, category, and status
    const filteredClasses = allClasses.filter((c) => {
        // Search filter (case-insensitive)
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

        // Status filter
        const matchesStatus =
            selectedStatus === "All" ||
            (selectedStatus === "Pending" && (c.grade === null || c.grade === "" || c.grade === undefined ) )||
            (selectedStatus === "Passed" && c.grade >= 5) ||
            (selectedStatus === "Failed" && (c.grade !== "" && c.grade !== null) && c.grade < 5)
        ;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    useEffect(() => {
        console.log(searchQuery);
    }, [searchQuery])

    // Group filtered classes by category
    const groupedClasses = categories.reduce((acc, category) => {
        acc[category] = filteredClasses.filter((c) => c.category === category);
        return acc;
    }, {});

    groupedClasses["Άλλα"] = filteredClasses.filter((c) => !c.category || !categories.includes(c.category));

    return (
        <BoxLayout title="Classes" index={index}>

            <Toolbar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                setSearchQuery={setSearchQuery}
            />

            <div className="overflow-y-auto">
                {Object.keys(groupedClasses).map((category) => {
                    if (groupedClasses[category].length === 0) return null;
                    return (
                        <div key={category} className="mb-4 pt-4 rounded-md">
                            <h3 className="w-full text-lg text-primary font-bold py-2 px-2">{category}</h3>
                            <div className="space-y-3 rounded">
                                <AnimatePresence>
                                    {groupedClasses[category].map((c) => (
                                        <ClassItem key={c.id + componentKey} c={c} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}

                {filteredClasses.length === 0 && (
                    <p className="text-center text-gray-500">No matching classes found.</p>
                )}
            </div>
        </BoxLayout>
    );
};

ClassList.propTypes = {
    index: PropTypes.number.isRequired,
};

export default ClassList;
