import {RiCloseFill, RiSaveLine} from "@remixicon/react";
import useAppContext from "../context/useAppContext.jsx";
import { motion} from "framer-motion";
import {Input, ClassError} from "./index.jsx"
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const ClassItem = ({c}) => {
    const { classes, setClasses, setFixedClasses} = useAppContext();
    const isFixedClass = c.isFixed;
    const [saveEnabled, setSaveEnabled] = useState(false);

    // input states
    const [ects, setEcts] = useState(c.ects);
    const [grade, setGrade] = useState(c.grade);

    // errors
    const [ectsHasError, setEctsHasError] = useState(false);
    const [ectsError, setEctsError] = useState("");

    const [gradeHasError, setGradeHasError] = useState(false);
    const [gradeError, setGradeError] = useState("");

    // change state
    const [gradeChanged, setGradeChanged] = useState(false);
    const [ectsChanged, setEctsChanged] = useState(false);

    // change handlers
    const handleEctsChange = (e) => {
       setEctsHasError(false);
       setEctsError("");
       setEcts(e.target.value);
       if(e.target.value !== c.ects && e.target.value !== "") {
           setEctsChanged(true);
       } else {
           setEctsChanged(false);
       }
    };

    const handleGradeChange = (e) => {
        setGradeHasError(false);
        setGradeError("");
        setGrade(e.target.value);
        if(e.target.value !== c.grade) {
            setGradeChanged(true);
        } else {
            setGradeChanged(false);
        }
    };

    useEffect(() => {
        setSaveEnabled(ectsChanged || gradeChanged)
        if(ects === "") {
            setSaveEnabled(false)
        }
    },[ectsChanged, gradeChanged, ects, grade])

    // save handler
    const handleSave = (e) => {
        e.preventDefault();

        let canSave = true;

        // ECTS
        if(ects < 2 || ects > 8) {
            setEctsHasError(true);
            setEctsError("Please enter valid ECTs");
            canSave = false;
        } else {
            setEctsHasError(false);
            setEctsError("");
        }

        // GRADE
        if(grade < 0 || grade > 10) {
            setGradeHasError(true);
            setGradeError("Please enter a valid grade");
            canSave = false;
        } else {
            setGradeHasError(false);
            setGradeError("");
        }

        if(canSave) {
            if (isFixedClass) {
                setFixedClasses(prevClasses =>
                    prevClasses.map((cl) =>
                        cl.id === c.id ? { ...cl, grade: grade, ects: ects } : cl
                    )
                );
            } else {
                setClasses((prevClasses) =>
                    prevClasses.map((cl) =>
                        cl.id === c.id ? { ...cl, grade: grade, ects: ects  } : cl
                    )
                );
            }
        }
        setSaveEnabled(false);
    }

    // delete class
    const deleteClass = (id) => {
        setClasses(classes.filter((cl) => cl.id !== id));
    };

    // keydown handler
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
            <motion.div
                key={c.id}
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-3 flex items-center justify-between border-1 rounded border-gray-100"
            >
                <p className="text-dark font-medium w-1/4">{c.name}</p>

                <div className="flex items-center gap-2 w-1/4">
                    <span className="text-gray-600 text-sm">ECTs:</span>

                    <div className="flex flex-col">
                        <ClassError message={ectsError} error={ectsHasError}/>
                        <Input type="number" onKeyDown={handleKeyDown} title="ECTs" value={ects} handler={handleEctsChange} hasError={ectsHasError}/>
                    </div>

                </div>

                {/* Grade Input */}
                <div className="flex items-center gap-2 w-1/4">
                    <span className="text-gray-600 text-sm">Grade:</span>

                    <div className="flex flex-col">
                        <ClassError message={gradeError} error={gradeHasError}/>
                        <Input type="number" onKeyDown={handleKeyDown} title="Grade" value={grade} handler={handleGradeChange} hasError={gradeHasError}/>
                    </div>
                </div>

                <div className="flex justify-end gap-2 w-20">
                    {!isFixedClass && (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteClass(c.id)}
                            className="text-white bg-dark hover:bg-primary hover:cursor-pointer rounded-full w-7 h-7 flex justify-center items-center transition duration-200"
                        >
                            <RiCloseFill size={18} />
                        </motion.button>
                    )}

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        disabled={!saveEnabled}
                        onClick={handleSave}
                        className={` ${!saveEnabled ? "bg-gray-200" : "bg-dark hover:bg-primary hover:cursor-pointer"} text-white  rounded-full w-7 h-7 flex justify-center items-center transition duration-200`}
                    >
                        <RiSaveLine size={18} />
                    </motion.button>
                </div>

            </motion.div>

    )
}

ClassItem.propTypes = {
    c: PropTypes.object.isRequired,
}

export default ClassItem
