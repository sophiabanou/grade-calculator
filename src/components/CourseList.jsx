import { Suspense, useState} from "react";
import BoxLayout from "./BoxLayout.jsx";
import {useAppContext, useLanguageContext} from "../context/Hooks";
import { AnimatePresence } from "framer-motion";
import { LazyCourseItem, Toolbar, Loader } from "../components";
import PropTypes from "prop-types";
import { categories } from "../data";

const CourseList = ({ index }) => {
    const { allCourses, showMyCoursesOpen, major, specializations } = useAppContext();
    const { languageData } = useLanguageContext();

    // filters + search
    const [searchQuery, setSearchQuery] = useState("");

    const [selection, setSelection] = useState({
        category: "All",
        status: "All",
        major: "All",
        spec: "All",
    });

    const updateSelection = (key, value) => {
        setSelection((prev) => ({ ...prev, [key]: value }));
    };

    const myCourses = allCourses.filter((c) => {
        const matchedMajor = (major === "Undecided" || major === "") ? true :
            (c.major[0] === major || c.major[0] === 'all');
        const matchedSpec = (specializations.length === 0) ? true :
            (c.spec[0] === "all" ||
            c.spec.some(spec => specializations.includes(spec)));

        return matchedMajor && matchedSpec;
    })

    const filteredCourses = (showMyCoursesOpen? myCourses : allCourses).filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selection.category === "All" || c.category === selection.category;
        const matchesMajor =
            selection.major === "All" ||
            (selection.major === "shared" && c.major[0] === "all") ||
            (c.major[0] === selection.major);
        const matchesSpec = selection.spec === "All" || c.spec.includes(selection.spec);

        const matchesStatus =
            selection.status === "All" ||
            (selection.status === "pending" && (c.grade === null || c.grade === "" || c.grade === undefined)) ||
            (selection.status === "passed" && c.grade >= 5) ||
            (selection.status === "failed" && (c.grade !== "" && c.grade !== null) && c.grade < 5);

        return matchesSearch && matchesCategory && matchesStatus && matchesMajor && matchesSpec;
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

    return (
        <BoxLayout title={languageData?.course_list?.title} index={index}>
            <Toolbar
                selection={selection}
                updateSelection={updateSelection}
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
