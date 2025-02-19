import PropTypes from "prop-types";
import {BoxLayout, CourseError, ConfirmationMessage} from "./index.jsx";
import { useAppContext, useLanguageContext } from "../context/Hooks";
import { useState, useEffect } from "react";

const MajorSpecialization = ({ index }) => {
    const { major, specializations, setMajor, setSpecializations } = useAppContext();
    const { languageData } = useLanguageContext();

    const [selectedMajor, setSelectedMajor] = useState(major);
    const [selectedSpecializations, setSelectedSpecializations] = useState(specializations);

    const [error, setError] = useState(false);

    // confirmation message
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const openConfirmationMessage = () => {
        setConfirmationOpen(true);
        setTimeout(() => {
            setConfirmationOpen(false);
        }, 4000);
    };

    const handleMajorChange = (e) => {
        console.log(e.target.value);
        setSelectedMajor(e.target.value);
    };

    useEffect(() => {
       console.log(selectedMajor);
    }, [selectedMajor]);


    const handleSpecializationChange = (event) => {
        const value = event.target.value;
        if (selectedSpecializations.includes(value)) {
            setError(false);
            setSelectedSpecializations(selectedSpecializations.filter((s) => s !== value));
        } else if (selectedSpecializations.length < 2) {
            setError(false);
            setSelectedSpecializations([...selectedSpecializations, value]);
        } else {
            setError(true);
        }
    };

    const handleConfirm = () => {
        setMajor(selectedMajor);
        setSpecializations(selectedSpecializations);
        openConfirmationMessage()
    };

    const compareArrays = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            return false;
        }

        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();

        return sortedArr1.every((value, index) => value === sortedArr2[index]);
    };


    return (
        <BoxLayout title={languageData?.major_spec?.title} index={index}>
            <div className="space-y-4 h-full">
                <div>
                    <label className="block dark:text-dark-grey text-gray-600 text-sm mb-1">{languageData?.major_spec?.major}:</label>

                    <select
                        value={String(selectedMajor)}
                        onChange={handleMajorChange}
                        className={`dark:bg-dmode-input dark:font-light dark:focus:bg-dmode-input dark:text-dark-grey border-transparent dark:hover:border-dmode-border dark:focus:border-dmode-border dark:focus:outline-dmode-border max-md:text-sm w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                             hover:border-dark focus:border-dark focus:bg-light focus:outline-dark hover:cursor-pointer
                        `}
                    >
                        <option value="Undecided">-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>



                {/* Specialization Selection */}
                <div>
                    <label className="block dark:text-dark-grey text-gray-600 text-sm mb-1">{languageData?.major_spec?.spec}:</label>
                    <CourseError message={languageData?.major_spec?.error} error={error}/>
                    <div className="grid grid-cols-3 gap-3">
                        {["S1", "S2", "S3", "S4", "S5", "S6"].map((spec) => (
                            <label
                                key={spec}
                                className={`flex justify-center items-center space-x-2 p-2 border-2 rounded cursor-pointer lin-transition
                                    ${selectedSpecializations.includes(spec) ? "bg-primary text-light border-primary dark:border-dark-primary dark:bg-dark-primary" : "bg-transparent hover:bg-gray-100 border-dark dark:border-dmode-border dark:hover:bg-dmode-input"}
                                `}
                            >
                                {/*hidden checkbox*/}
                                <input
                                    type="checkbox"
                                    value={spec}
                                    checked={selectedSpecializations.includes(spec)}
                                    onChange={handleSpecializationChange}
                                    className="hidden"
                                />
                                <span className={` ${selectedSpecializations.includes(spec) ? "text-light": "text-dark dark:text-light"}  max-md:text-base text-lg font-semibold uppercase`}>{spec}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Confirmation Button */}
                <div className="flex justify-center mt-6">

                    <button
                        disabled={selectedMajor === major && compareArrays(specializations, selectedSpecializations)}
                        onClick={handleConfirm}
                        className={` mt-5 w-full 
                        ${selectedMajor === major &&  compareArrays(specializations, selectedSpecializations) ? "bg-gray-200 cursor-not-allowed border-gray-200 dark:bg-dmode-input dark:border-dmode-input dark:text-dmode" : "dark:bg-dark-primary dark:border-dark-primary dark:hover:border-primary bg-dark hover:bg-primary hover:cursor-pointer border-dark"}
                        bg-dark text-white border-3  p-2 rounded   lin-transition`}
                    >
                        <p className="text-sm uppercase font-semibold tracking-wider">{languageData?.major_spec?.button}</p>
                    </button>
                </div>
                <ConfirmationMessage message={languageData?.major_spec?.message} color="green" isOpen={confirmationOpen} />

            </div>
        </BoxLayout>
    );
};

MajorSpecialization.propTypes = {
    index: PropTypes.number.isRequired,
};

export default MajorSpecialization;
