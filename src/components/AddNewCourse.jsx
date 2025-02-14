import {Input, CourseError, BoxLayout, ConfirmationMessage } from "./index.jsx"
import { useState } from "react";
import useAppContext from "../context/useAppContext.jsx";
import PropTypes from 'prop-types';
import {categories} from "../data"

const AddNewCourse = ({index}) => {
    const { userCourses, setUserCourses, courseCount, setCourseCount, translate } = useAppContext();

    // form states
    const [name, setName] = useState("");
    const [credits, setCredits] = useState("");
    const [grade, setGrade] = useState("");
    const [category, setCategory] = useState("");

    // errors
    const [nameHasError, setNameHasError] = useState(false);
    const [nameError, setNameError] = useState("");

    const [creditsHasError, setCreditsHasError] = useState(false);
    const [creditsError, setCreditsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    const [categoryHasError, setCategoryHasError] = useState(false);
    const [categoryError, setCategoryError] = useState("");

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

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        let canSubmit = true;

        // NAME
        if (name === "") {
            setNameHasError(true);
            setNameError(translate("add-course.no-name-error"));
            canSubmit = false;
        } else {
            setNameHasError(false);
            setNameError("")
        }

        // CREDITS
        if (credits === "") {
            setCreditsHasError(true);
            setCreditsError(translate("add-course.no-credits-error"));
            canSubmit = false;
        } else if (credits < 2 || credits > 8) {
            setCreditsHasError(true);
            setCreditsError(translate("add-course.wrong-credits-error"));
            canSubmit = false;
        } else {
            setCreditsHasError(false);
            setCreditsError("")
        }

        // GRADE
        if (grade === "") {
            setGradeHasError(true);
            setGradeError(translate("add-course.no-grade-error"));
            canSubmit = false;
        } else if (grade < 0 || grade > 10) {
            setGradeHasError(true);
            setGradeError(translate("add-course.wrong-grade-error"));
            canSubmit = false;
        } else {
            setGradeHasError(false);
            setGradeError("")
        }

        // CATEGORY
        if (category === "") {
            setCategoryHasError(true);
            setCategoryError(translate("add-course.no-category-error"));
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
        <BoxLayout title={translate("add-course.title")} index={index}>
            <div className="mb-4 w-full">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                    <CourseError message={nameError} error={nameHasError} />
                    <Input type="text" handler={handleNameChange} hasError={nameHasError} title={translate("add-course.class-name")} value={name}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={creditsError} error={creditsHasError} />
                    <Input type="number" handler={handleCreditsChange} hasError={creditsHasError} title={translate("add-course.credits")} value={credits}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={gradeError} error={gradeHasError} />
                    <Input type="number" handler={handleGradeChange} hasError={gradeHasError} title={translate("add-course.grade")} value={grade}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={categoryError} error={categoryHasError} />
                    <Input type="select" handler={handleCategoryChange} hasError={categoryHasError} title={translate("add-course.category")} value={category} data={categories}/>

                    <button
                        type="submit"
                        className="mt-5 w-full bg-dark text-white border-3 border-dark p-2 rounded hover:cursor-pointer hover:bg-primary lin-transition"
                    >
                        <p className="text-sm uppercase font-semibold tracking-wider">{translate("add-course.button")}</p>
                    </button>
                </form>

                <ConfirmationMessage message={translate("add-course.success-message")} color="green" isOpen={confirmationOpen} />

            </div>
        </BoxLayout>
    );
};

AddNewCourse.propTypes = {
    index: PropTypes.number.isRequired,
};

export default AddNewCourse;
