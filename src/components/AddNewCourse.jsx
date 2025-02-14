import {Input, CourseError, BoxLayout, ConfirmationMessage } from "./index.jsx"
import { useState } from "react";
import useAppContext from "../context/useAppContext.jsx";
import PropTypes from 'prop-types';
import {categories} from "../data"

const AddNewCourse = ({index}) => {
    const { userCourses, setUserCourses, courseCount, setCourseCount } = useAppContext();

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
            setNameError("Εισάγετε όνομα μαθήματος")
            canSubmit = false;
        } else {
            setNameHasError(false);
            setNameError("")
        }

        // CREDITS
        if (credits === "") {
            setCreditsHasError(true);
            setCreditsError("Εισάγετε διδακτικές μονάδες")
            canSubmit = false;
        } else if (credits < 2 || credits > 8) {
            setCreditsHasError(true);
            setCreditsError("Εισάγετε έγκυρες διδακτικές μονάδες [2-8]")
            canSubmit = false;
        } else {
            setCreditsHasError(false);
            setCreditsError("")
        }

        // GRADE
        if (grade === "") {
            setGradeHasError(true);
            setGradeError("Εισάγετε βαθμό")
            canSubmit = false;
        } else if (grade < 0 || grade > 10) {
            setGradeHasError(true);
            setGradeError("Εισάγετε έγκυρο βαθμό [0-10]")
            canSubmit = false;
        } else {
            setGradeHasError(false);
            setGradeError("")
        }

        // CATEGORY
        if (category === "") {
            setCategoryHasError(true);
            setCategoryError("Εισάγετε κατηγορία μαθήματος")
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
        <BoxLayout title="Προσθήκη Νέου Μαθήματος" index={index}>
            <div className="mb-4 w-full">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                    <CourseError message={nameError} error={nameHasError} />
                    <Input type="text" handler={handleNameChange} hasError={nameHasError} title="Όνομα Μαθήματος" value={name}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={creditsError} error={creditsHasError} />
                    <Input type="number" handler={handleCreditsChange} hasError={creditsHasError} title="Διδακτικές Μονάδες" value={credits}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={gradeError} error={gradeHasError} />
                    <Input type="number" handler={handleGradeChange} hasError={gradeHasError} title="Βαθμός" value={grade}/>
                    <div className="w-full h-1 bg-transparent"></div>

                    <CourseError message={categoryError} error={categoryHasError} />
                    <Input type="select" handler={handleCategoryChange} hasError={categoryHasError} title="Κατηγορία" value={category} data={categories}/>

                    <button
                        type="submit"
                        className="mt-5 w-full bg-dark text-white border-3 border-dark p-2 rounded hover:cursor-pointer hover:bg-primary lin-transition"
                    >
                        <p className="text-sm uppercase font-semibold tracking-wider">Προσθηκη Μαθηματος</p>
                    </button>
                </form>

                <ConfirmationMessage message="Επιτυχής προσθήκη μαθήματος!" color="green" isOpen={confirmationOpen} />

            </div>
        </BoxLayout>
    );
};

AddNewCourse.propTypes = {
    index: PropTypes.number.isRequired,
};

export default AddNewCourse;
