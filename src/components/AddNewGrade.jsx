import {Input, ClassError, BoxLayout } from "./index.jsx"
import { useState } from "react";
import useAppContext from "../context/useAppContext.jsx";
import PropTypes from 'prop-types';
import {categories} from "../data"

const AddNewGrade = ({index}) => {
    const { classes, setClasses, classCount, setClassCount } = useAppContext();

    // form states
    const [name, setName] = useState("");
    const [ects, setEcts] = useState("");
    const [grade, setGrade] = useState("");
    const [category, setCategory] = useState("");

    // errors
    const [nameHasError, setNameHasError] = useState(false);
    const [nameError, setNameError] = useState("");

    const [ectsHasError, setEctsHasError] = useState(false);
    const [ectsError, setEctsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    const [categoryHasError, setCategoryHasError] = useState(false);
    const [categoryError, setCategoryError] = useState("");

    // add class
    const addClass = () => {
        if (!name || !ects || !grade || !category) return;

        const newClassId = classCount + 1;

        setClasses([...classes, { name, ects: Number(ects), grade: Number(grade), category, id: newClassId }]);
        setClassCount(newClassId);

        setName("");
        setEcts("");
        setGrade("");
        setCategory("");
    };


    // change handlers
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

    // form submit handler
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
            <div className="mb-4 w-full">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                    <ClassError message={nameError} error={nameHasError} />
                    <Input type="text" handler={handleNameChange} hasError={nameHasError} title="Class Name" value={name}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <ClassError message={ectsError} error={ectsHasError} />
                    <Input type="number" handler={handleEctsChange} hasError={ectsHasError} title="ECTs" value={ects}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <ClassError message={gradeError} error={gradeHasError} />
                    <Input type="number" handler={handleGradeChange} hasError={gradeHasError} title="Grade" value={grade}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <ClassError message={categoryError} error={categoryHasError} />
                    <Input type="select" handler={handleCategoryChange} hasError={categoryHasError} value={category} data={categories}/>

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

AddNewGrade.propTypes = {
    index: PropTypes.number.isRequired,
};

export default AddNewGrade;
