import BoxLayout from "./BoxLayout.jsx";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import {motion, AnimatePresence} from "framer-motion";
import ClassError from "./ClassError.jsx";

const AddNewGrade = ({index}) => {
    const { classes, setClasses, categories } = useAppContext();

    const [name, setName] = useState("");
    const [ects, setEcts] = useState("");
    const [grade, setGrade] = useState("");
    const [category, setCategory] = useState("");

    const [nameHasError, setNameHasError] = useState(false);
    const [nameError, setNameError] = useState("");

    const [ectsHasError, setEctsHasError] = useState(false);
    const [ectsError, setEctsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    const [categoryHasError, setCategoryHasError] = useState(false);
    const [categoryError, setCategoryError] = useState("");

    const addClass = () => {
        if (!name || !ects || !grade || !category) return;
        setClasses([...classes, { name, ects: Number(ects), grade: Number(grade), category }]);
        setName("");
        setEcts("");
        setGrade("");
        setCategory(""); // Reset category input
    };

    const handleEctsChange = (e) => {
        setEctsHasError(false);
        setEctsError("");
        setEcts(e.target.value);
    }

    const handleNameChange = (e) => {
        setNameHasError(false);
        setNameError("");
        setName(e.target.value);
    }

    const handleGradeChange = (e) => {
        setGradeHasError(false);
        setGradeError("");
        setGrade(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategoryHasError(false);
        setCategoryError("");
        setCategory(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let canSubmit = true;

        // NAME
        if (name === "") {
            setNameHasError(true);
            setNameError("Please enter a name")
            canSubmit = false;
        } else {
            setNameHasError(false);
            setNameError("")
        }

        // ECTS
        if (ects === "") {
            setEctsHasError(true);
            setEctsError("Please enter ECTs")
            canSubmit = false;
        } else if (ects < 2 || ects > 8) {
            setEctsHasError(true);
            setEctsError("Please enter valid ECTs")
            canSubmit = false;
        } else {
            setEctsHasError(false);
            setEctsError("")
        }

        // GRADE
        if (grade === "") {
            setGradeHasError(true);
            setGradeError("Please enter a grade")
            canSubmit = false;
        } else if (grade < 0 || ects > 10) {
            setGradeHasError(true);
            setGradeError("Please enter a valid grade")
            canSubmit = false;
        } else if (grade < 5) {
            setGradeHasError(true);
            setGradeError("You haven't passed this class :(")
            canSubmit = false;
        } else {
            setGradeHasError(false);
            setGradeError("")
        }

        // CATEGORY
        if (category === "") {
            setCategoryHasError(true);
            setCategoryError("Please enter a category")
            canSubmit = false;
        } else {
            setCategoryHasError(false);
            setCategoryError("")
        }

        if (canSubmit) {
            addClass();
        }
    };


    return (
        <BoxLayout title="Add New Grade" index={index}>
            <div className="mb-4 w-100">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                    <ClassError message={nameError} error={nameHasError} />

                    <input
                        type="text"
                        placeholder="Class Name"
                        value={name}
                        id="name"
                        onChange={handleNameChange}
                        className={`w-full p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1  outline-1 outline-transparent
                        hover:border-dark focus:border-dark focus:bg-light focus:outline-dark 
                        ${nameHasError ? "border-red-700 bg-light" : "border-transparent"}`}
                    />

                    <ClassError message={ectsError} error={ectsHasError} />

                    <input
                        type="number"
                        inputMode="numeric"
                        placeholder="ECTS"
                        value={ects}
                        onChange={handleEctsChange}
                        className={` w-full p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                        hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                        ${ectsHasError ? "border-red-700 bg-light" : "border-transparent" } `}
                    />

                    <ClassError message={gradeError} error={gradeHasError} />

                    <input
                        type="number"
                        placeholder="Grade"
                        value={grade}
                        onChange={handleGradeChange}
                        className={`w-full p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                        hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                        ${gradeHasError ? "border-red-700 bg-light" : "border-transparent" } `}
                    />

                    <ClassError message={categoryError} error={categoryHasError} />

                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className={`w-full p-2 px-4 mb-2 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                         hover:border-dark focus:border-dark focus:bg-light focus:outline-dark hover:cursor-pointer
                         ${categoryHasError ? "border-red-700 bg-light" : "border-transparent" }`}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="mt-5 w-full bg-dark text-white border-3 border-dark p-2 rounded hover:cursor-pointer hover:bg-primary lin-transition"
                    >
                        <p className="text-sm uppercase font-semibold tracking-wider">Add Class</p>
                    </button>
                </form>
            </div>
        </BoxLayout>
    );
};
export default AddNewGrade;
