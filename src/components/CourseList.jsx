import { Suspense, useState} from "react";
import BoxLayout from "./BoxLayout.jsx";
import {useAppContext, useLanguageContext} from "../context/Hooks";
import { AnimatePresence } from "framer-motion";
import { LazyCourseItem, Toolbar, Loader } from "../components";
import PropTypes from "prop-types";
import { categories } from "../data";

const CourseList = ({ index }) => {
    const { allCourses } = useAppContext();
    const { languageData } = useLanguageContext();

    // filters + search
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredCourses = allCourses.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
        const matchesStatus =
            selectedStatus === "All" ||
            (selectedStatus === "pending" && (c.grade === null || c.grade === "" || c.grade === undefined)) ||
            (selectedStatus === "passed" && c.grade >= 5) ||
            (selectedStatus === "failed" && (c.grade !== "" && c.grade !== null) && c.grade < 5);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // sort
    const [sortBy, setSortBy] = useState("alphabet");
    const [sortDirection, setSortDirection] = useState("asc");

    const sortedCourses = filteredCourses.sort((a, b) => {
        // handle sort type
        const nameA = languageData?.courses?.[a.name] || a.name;
        const nameB = languageData?.courses?.[b.name] || b.name;

        let compareA =
            sortBy === "alphabet" ? nameA.toLowerCase() :
                sortBy === "grade" ? parseFloat(a.grade) || 0 :
                    sortBy === "credits" ? a.credits : nameA.toLowerCase();

        let compareB =
            sortBy === "alphabet" ? nameB.toLowerCase() :
                sortBy === "grade" ? parseFloat(b.grade) || 0 :
                    sortBy === "credits" ? b.credits : nameB.toLowerCase();

        if (sortBy === "alphabet") {
            compareA = compareA.toLowerCase();
            compareB = compareB.toLowerCase();
        }

        if (sortBy === "grade" || sortBy === "credits") {
            compareA = parseFloat(compareA);
            compareB = parseFloat(compareB);
        }

        // handle sort direction
        if (sortDirection === "asc") {
            return compareA < compareB ? -1 : 1;
        } else {
            return compareA > compareB ? -1 : 1;
        }
    });

    // group courses by category
    const groupedCourses = categories.reduce((acc, category) => {
        acc[category] = sortedCourses
            .filter((c) => c.category === category)
        return acc;
    }, {});

    console.log(groupedCourses);
    return (
        <BoxLayout title={languageData?.course_list?.title} index={index}>
            <Toolbar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
            />

            <div className="overflow-y-auto">
                {Object.keys(groupedCourses).map((category) => {
                    if (groupedCourses[category].length === 0) return null;
                    return (
                        <div key={category} className="mb-4 pt-4 rounded-md">
                            <h3 className="max-md:text-base w-full text-lg text-primary font-bold py-2 px-2">
                                {languageData?.filters?.[category] || category}
                            </h3>
                            <div className="space-y-3 rounded">
                                <AnimatePresence>
                                    <Suspense fallback={<Loader />}>
                                        {groupedCourses[category].map((course) => (
                                            <LazyCourseItem key={course.id} course={course} />
                                        ))}
                                    </Suspense>
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}

                {filteredCourses.length === 0 && (
                    <p className="text-center text-gray-500 py-3">{languageData?.course_list?.not_found}.</p>
                )}
            </div>
        </BoxLayout>
    );
};

CourseList.propTypes = {
    index: PropTypes.number.isRequired,
};

export default CourseList;
