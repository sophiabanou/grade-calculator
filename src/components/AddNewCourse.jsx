import {Input, CourseError, BoxLayout, ConfirmationMessage } from "./index.jsx"
import { useState } from "react";
import {useLanguageContext, useAppContext} from "../context/Hooks";
import PropTypes from 'prop-types';
import {categories} from "../data"


const AddNewCourse = ({index}) => {
    const { userCourses, setUserCourses, courseCount, setCourseCount } = useAppContext();
    const {languageData} = useLanguageContext();
    // form states
    const [name, setName] = useState("");
    const [credits, setCredits] = useState("");
    const [grade, setGrade] = useState("");
    const [category, setCategory] = useState("");
    const [major, setMajor] = useState("");
    const [spec, setSpec] = useState([]);


    const cats = ["el", "opt"];
    const majors = ["A", "B", "all"];
    const specs = ["S1","S2","S3","S4","S5","S6"];

    // errors
    const [nameHasError, setNameHasError] = useState(false);
    const [nameError, setNameError] = useState("");

    const [creditsHasError, setCreditsHasError] = useState(false);
    const [creditsError, setCreditsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    const [categoryHasError, setCategoryHasError] = useState(false);
    const [categoryError, setCategoryError] = useState("");

    const [majorHasError, setMajorHasError] = useState(false);
    const [majorError, setMajorError] = useState("");

    const [specHasError, setSpecHasError] = useState(false);
    const [specError, setSpecError] = useState("");

    // confirmation message
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    // add course
    const addCourse = () => {
        if (!name || !credits || !grade || !category) return;

        const newCourseId = courseCount + 1;

        setUserCourses([...userCourses, { name, credits: Number(credits), grade: Number(grade), category, id: newCourseId }]);
        setCourseCount(newCourseId);

        setName("");
        setCredits("");
        setGrade("");
        setCategory("");
    };


    // change handlers
    const handleCreditsChange = (e) => {
        setCreditsHasError(false);
        setCreditsError("");
        setCredits(e.target.value);
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

    const handleMajorChange = (e) => {
        setMajorHasError(false);
        setMajorError("");
        console.log(e.target.value);
        setMajor(e.target.value);
    }
    const handleSpecChange = (e) => {
        setSpecHasError(false);
        setSpecError("");
        setSpec(e.target.value);
    }

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        let canSubmit = true;

        // NAME
        if (name === "") {
            setNameHasError(true);
            setNameError(languageData?.new_course?.errors?.no_name)
            canSubmit = false;
        } else {
            setNameHasError(false);
            setNameError("")
        }

        // CREDITS
        if (credits === "") {
            setCreditsHasError(true);
            setCreditsError(languageData?.new_course?.errors?.no_credits)
            canSubmit = false;
        } else if (credits < 2 || credits > 8) {
            setCreditsHasError(true);
            setCreditsError(languageData?.new_course?.errors?.wrong_credits)
            canSubmit = false;
        } else {
            setCreditsHasError(false);
            setCreditsError("")
        }

        // GRADE
        if (grade === "") {
            setGradeHasError(true);
            setGradeError(languageData?.new_course?.errors?.no_grade)
            canSubmit = false;
        } else if (grade < 0 || grade > 10) {
            setGradeHasError(true);
            setGradeError(languageData?.new_course?.errors?.wrong_grade)
            canSubmit = false;
        } else {
            setGradeHasError(false);
            setGradeError("")
        }

        // CATEGORY
        if (category === "") {
            setCategoryHasError(true);
            setCategoryError(languageData?.new_course?.errors?.no_category)
            canSubmit = false;
        } else {
            setCategoryHasError(false);
            setCategoryError("")
        }

        if (canSubmit) {
            addCourse();
            openConfirmationMessage();
        }
    };

    // open confirmation message
    const openConfirmationMessage = () => {
        setConfirmationOpen(true);
        setTimeout(() => {
            setConfirmationOpen(false);
        }, 4000);
    };


    return (
        <BoxLayout title={languageData?.new_course?.title} index={index}>
            <div className="mb-4 w-full h-full">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                    <CourseError message={nameError} error={nameHasError} />
                    <Input type="text" handler={handleNameChange} hasError={nameHasError} title={languageData?.new_course?.fields?.course} value={name}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={creditsError} error={creditsHasError} />
                    <Input type="number" handler={handleCreditsChange} hasError={creditsHasError} title={languageData?.new_course?.fields?.credits} value={credits}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={gradeError} error={gradeHasError} />
                    <Input type="number" handler={handleGradeChange} hasError={gradeHasError} title={languageData?.new_course?.fields?.grade} value={grade}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={categoryError} error={categoryHasError} />
                    <Input type="select" handler={handleCategoryChange} hasError={categoryHasError} title={languageData?.new_course?.fields?.category} value={category} data={cats}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={categoryError} error={categoryHasError} />
                    <div className="flex gap-3">
                        <Input type="select" handler={handleMajorChange} hasError={majorHasError} title={languageData?.new_course?.fields?.major} value={major} data={majors}/>
                        <Input type="select" handler={handleCategoryChange} hasError={categoryHasError} title={languageData?.new_course?.fields?.spec} value={category} data={specs}/>
                    </div>

                    <button
                        type="submit"
                        className="dark:bg-dark-primary dark:border-dark-primary dark:hover:border-primary mt-5 w-full bg-dark text-white border-3 border-dark p-2 rounded hover:cursor-pointer hover:bg-primary lin-transition"
                    >
                        <p className="text-sm uppercase font-semibold tracking-wider">{languageData?.new_course?.button}</p>
                    </button>
                </form>

                <ConfirmationMessage message={languageData?.new_course?.message} color="green" isOpen={confirmationOpen} />

            </div>
        </BoxLayout>
    );
};

AddNewCourse.propTypes = {
    index: PropTypes.number.isRequired,
};

export default AddNewCourse;
