import { Suspense, useState} from "react";
import BoxLayout from "./BoxLayout.jsx";
import useAppContext from "../context/useAppContext.jsx";
import { AnimatePresence } from "framer-motion";
import { LazyCourseItem, Toolbar, Loader } from "../components";
import PropTypes from "prop-types";
import { categories } from "../data";

const CourseList = ({ index }) => {
    const { allCourses } = useAppContext();

    // filters + search
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredCourses = allCourses.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
        const matchesStatus =
            selectedStatus === "All" ||
            (selectedStatus === "Σε Αναμονή" && (c.grade === null || c.grade === "" || c.grade === undefined)) ||
            (selectedStatus === "Περασμένο" && c.grade >= 5) ||
            (selectedStatus === "Αποτυχημένο" && (c.grade !== "" && c.grade !== null) && c.grade < 5);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // sort
    const [sortBy, setSortBy] = useState("alphabet");
    const [sortDirection, setSortDirection] = useState("asc");

    const sortedCourses = filteredCourses.sort((a, b) => {
        // handle sort type
        let compareA =
            sortBy === "alphabet" ? a.name.toLowerCase() :
                sortBy === "grade" ? a.grade :
                    sortBy === "credits" ? a.credits : a.name.toLowerCase();

        let compareB =
            sortBy === "alphabet" ? b.name.toLowerCase() :
                sortBy === "grade" ? b.grade :
                    sortBy === "credits" ? b.credits : b.name.toLowerCase();

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

    // add a misc category
    groupedCourses["Άλλα"] = sortedCourses.filter((c) => !c.category || !categories.includes(c.category));

    return (
        <BoxLayout title="Μαθήματα" index={index}>
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
                            <h3 className="max-md:text-base w-full text-lg text-primary font-bold py-2 px-2">{category}</h3>
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
                    <p className="text-center text-gray-500 py-3">Δεν βρέθηκαν αντίστοιχα μαθήματα.</p>
                )}
            </div>
        </BoxLayout>
    );
};

CourseList.propTypes = {
    index: PropTypes.number.isRequired,
};

export default CourseList;
