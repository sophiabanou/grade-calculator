import BoxLayout from "./BoxLayout.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { RiCloseFill } from "@remixicon/react";
import { useEffect, useState } from "react";

const ClassList = ({ index }) => {
    const { classes, setClasses, categories } = useAppContext();

    const deleteClass = (index) => {
        setClasses(classes.filter((_, i) => i !== index));
    };

    useEffect(() => {
        localStorage.setItem("classes", JSON.stringify(classes));
    }, [classes]);

    // Grouping classes by category
    const groupedClasses = categories.reduce((acc, category) => {
        acc[category] = classes.filter((c) => c.category === category);
        return acc;
    }, {});

    // Sorting classes within each category
    for (let category in groupedClasses) {
        groupedClasses[category].sort((a, b) => a.name.localeCompare(b.name));
    }

    groupedClasses["Others"] = classes.filter((c) => !c.category || !categories.includes(c.category));

    useEffect(() => {
        console.log(groupedClasses, classes);
    }, [groupedClasses]);

    const [gradeHasError, setGradeHasError] = useState(false);

    const handleGradeChange = (category, index, value) => {
        setClasses((prevClasses) =>
            prevClasses.map((c, i) =>
                c.category === category && i === index ? { ...c, grade: value } : c
            )
        );
    };

    const handleEctsChange = (category, index, value) => {
        setClasses((prevClasses) =>
            prevClasses.map((c, i) =>
                c.category === category && i === index ? { ...c, ects: value } : c
            )
        );
    };


    return (
        <BoxLayout title="Classes" index={index}>
            <div className="max-md:w-100 w-200 max-h-120 overflow-y-auto">
                {Object.keys(groupedClasses).map((category) => {
                    if (groupedClasses[category].length === 0) return null;
                    return (
                        <div key={category} className="mb-4 rounded-md ">
                            <h3 className="w-full text-[16px] border-b-2 border-gray-100 bg-pink-dark rounded text-center wrap font-medium text-light py-1 px-3">{category}</h3>
                            <div className="space-y-3  ">
                                {groupedClasses[category].map((c, index) => (
                                    <div
                                        key={index}
                                        className=" p-3 flex items-center justify-between"
                                    >
                                        {/* Class Name */}
                                        <p className="text-dark font-medium w-1/4">{c.name}</p>

                                        {/* ECTs Input */}
                                        <div className="flex items-center gap-2 w-1/4">
                                            <span className="text-gray-600 text-sm">ECTs:</span>
                                            <input
                                                type="number"
                                                placeholder="ECTs"
                                                value={c.ects}
                                                onChange={(e) => handleEctsChange(category, index, e.target.value)}
                                                className={`w-20 p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                                                hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                                                ${gradeHasError ? "border-red-700 bg-light" : "border-transparent" } `}
                                            />
                                        </div>

                                        {/* Grade Input */}
                                        <div className="flex items-center gap-2 w-1/4">
                                            <span className="text-gray-600 text-sm">Grade:</span>
                                            <input
                                                type="number"
                                                placeholder="Grade"
                                                value={c.grade}
                                                onChange={(e) => handleGradeChange(category, index, e.target.value)}
                                                className={`w-20 p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                                                hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                                                ${gradeHasError ? "border-red-700 bg-light" : "border-transparent" } `}
                                            />
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteClass(index)}
                                            className="text-white bg-dark hover:bg-primary hover:cursor-pointer rounded-full w-7 h-7 flex justify-center items-center transition duration-200"
                                        >
                                            <RiCloseFill size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>



                        </div>
                    );
                })}
            </div>
        </BoxLayout>
    );
};

export default ClassList;
