import {RiCloseFill, RiSaveLine} from "@remixicon/react";
import useAppContext from "../context/useAppContext";
import useLanguageContext from "../context/useLanguageContext";
import { motion} from "framer-motion";
import {Input, CourseError, Button, Status} from "./index.jsx"
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';


const CourseItem = ({c}) => {
    const {userCourses, setUserCourses, setFixedCourses} = useAppContext();
    const {languageData} = useLanguageContext();
    const isFixedCourse = c.isFixed;
    const [saveEnabled, setSaveEnabled] = useState(false);

    // initial states
    const [initialCredits, setInitialCredits] = useState(c.credits);
    const [initialGrade, setInitialGrade] = useState(c.grade);

    // input states
    const [credits, setCredits] = useState(c.credits);
    const [grade, setGrade] = useState(c.grade);

    useEffect(() => {
        setCredits(c.credits);
        setGrade(c.grade);
        setInitialCredits(c.credits);
        setInitialGrade(c.grade);
    }, [c]);


    // errors
    const [creditsHasError, setCreditsHasError] = useState(false);
    const [creditsError, setCreditsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    // change handlers
    const handleCreditsChange = (e) => {
       setCreditsHasError(false);
       setCreditsError("");
       setCredits(e.target.value);
    };

    const handleGradeChange = (e) => {
        setGradeHasError(false);
        setGradeError("");
        setGrade(e.target.value);
    };

    useEffect(() => {
        setSaveEnabled(credits !== initialCredits || grade !== initialGrade);
        if (credits === "") {
            setSaveEnabled(false);
        }
    }, [credits, grade, initialCredits, initialGrade]);


    // save handler
    const handleSave = (e) => {
        e.preventDefault();

        let canSave = true;

        // CREDITS
        if(credits < 2 || credits > 8) {
            setCreditsHasError(true);
            setCreditsError(languageData?.course_item?.errors?.credits);
            canSave = false;
        } else {
            setCreditsHasError(false);
            setCreditsError("");
        }

        // GRADE
        if(grade < 0 || grade > 10) {
            setGradeHasError(true);
            setGradeError(languageData?.course_item?.errors?.grade);
            canSave = false;
        } else {
            setGradeHasError(false);
            setGradeError("");
        }

        if(canSave) {
            if (isFixedCourse) {
                setFixedCourses(prevCourses =>
                    prevCourses.map((cl) =>
                        cl.id === c.id ? { ...cl, grade: grade, credits: credits } : cl
                    )
                );
            } else {
                setUserCourses((prevCourses) =>
                    prevCourses.map((cl) =>
                        cl.id === c.id ? { ...cl, grade: grade, credits: credits  } : cl
                    )
                );
            }
        }
        setSaveEnabled(false);
    }


    // delete course
    const deleteCourse = () => {
        setUserCourses(userCourses.filter((cl) => cl.id !== c.id));
    };

    // keydown handler
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    // status indicator
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (c.grade === "" || c.grade === undefined || c.grade === null) {
            setStatus("Pending");
        } else if (c.grade < 5) {
            setStatus("Failed");
        } else {
            setStatus("Passed");
        }
    }, [c.grade]);

    return (
        <>
            <motion.div
                key={c.id}
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-3 h-auto flex items-center max-md:flex-col max-md:gap-5 justify-center border-1 rounded border-gray-100 gap-10"
            >
                <div className="max-md:w-full max-lg:w-3/12  w-5/12 flex items-center gap-4">
                    <Status status={status} />
                    <p className="max-md:text-sm max-md:font-semibold text-dark font-medium  break-words hyphens-auto leading-normal">{c.name}</p>
                </div>

                <div className="flex max-md:w-[90%] gap-10 w-6/12">
                    <div className="flex items-center gap-2  max-md:flex-col max-md:items-start">
                        <span className="text-gray-600 text-sm">{languageData?.course_item?.fields?.credits}:</span>

                        <div className="flex flex-col">
                            <CourseError message={creditsError} error={creditsHasError}/>
                            <Input type="number" onKeyDown={handleKeyDown} title="" value={credits} handler={handleCreditsChange} hasError={creditsHasError}/>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
                        <span className="text-gray-600 text-sm">{languageData?.course_item?.fields?.grade}:</span>

                        <div className="flex flex-col">
                            <CourseError message={gradeError} error={gradeHasError}/>
                            <Input type="number" onKeyDown={handleKeyDown} title="" value={grade} handler={handleGradeChange} hasError={gradeHasError}/>
                        </div>
                    </div>
                </div>

                <div className=" max-md:w-full max-md:max-w-[90%] flex justify-end gap-2 w-1/12">
                    {!isFixedCourse && (
                        <Button Icon={RiCloseFill} handler={deleteCourse} caption={languageData?.course_item?.captions.delete}/>
                    )}

                    <Button Icon={RiSaveLine} handler={handleSave} disabled={!saveEnabled} caption={languageData?.course_item?.captions.save}/>

                </div>

            </motion.div>

        </>
    )
}

CourseItem.propTypes = {
    c: PropTypes.object.isRequired,
}

export default CourseItem
