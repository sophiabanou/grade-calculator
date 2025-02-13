import {RiCloseFill, RiSaveLine} from "@remixicon/react";
import useAppContext from "../context/useAppContext.jsx";
import { motion} from "framer-motion";
import {Input, ClassError, Button, Status} from "./index.jsx"
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
    const deleteClass = () => {
        setClasses(classes.filter((cl) => cl.id !== c.id));
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
            <motion.div
                key={c.id}
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-3 h-auto flex items-center max-md:flex-col max-md:gap-5 justify-center border-1 rounded border-gray-100 gap-10"
            >
                <div className="max-md:w-full max-lg:w-3/12  w-5/12 flex items-center gap-4">
                    <Status status={status} />
                    <p className="w-full text-dark font-medium  break-words hyphens-auto leading-normal">{c.name}</p>
                </div>

                <div className="flex max-md:w-[90%] gap-10 w-6/12">
                    <div className="flex items-center gap-2  max-md:flex-col max-md:items-start">
                        <span className="text-gray-600 text-sm">ECTs:</span>

                        <div className="flex flex-col">
                            <ClassError message={ectsError} error={ectsHasError}/>
                            <Input type="number" onKeyDown={handleKeyDown} title="" value={ects} handler={handleEctsChange} hasError={ectsHasError}/>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
                        <span className="text-gray-600 text-sm">Grade:</span>

                        <div className="flex flex-col">
                            <ClassError message={gradeError} error={gradeHasError}/>
                            <Input type="number" onKeyDown={handleKeyDown} title="" value={grade} handler={handleGradeChange} hasError={gradeHasError}/>
                        </div>
                    </div>
                </div>

                <div className="max-md:justify-start max-md:w-full max-md:max-w-[90%] flex justify-end gap-2 w-1/12">
                    {!isFixedClass && (
                        <Button Icon={RiCloseFill} handler={deleteClass} caption="Διαγραφή μαθήματος"/>
                    )}

                    <Button Icon={RiSaveLine} handler={handleSave} disabled={!saveEnabled} caption="Αποθήκευση αλλαγών"/>

                </div>

            </motion.div>

    )
}

ClassItem.propTypes = {
    c: PropTypes.object.isRequired,
}

export default ClassItem
