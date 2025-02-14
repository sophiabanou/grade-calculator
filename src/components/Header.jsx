import {useState} from 'react'
import {exportGrades, importGrades} from "../utilities";
import {RiMenuLine, RiCloseFill} from "@remixicon/react";
import {motion, AnimatePresence} from "framer-motion";
import useAppContext from "../context/useAppContext.jsx";
import {Button} from "./index.jsx";
import ConfirmationMessage from "./ConfirmationMessage.jsx";


const Header = () => {

    const {allCourses, setUserCourses, setFixedCourses, expDisabled, impDisabled} = useAppContext();


    const triggerFileInput = () => {
        document.getElementById("file-input").click();
    };

    // confirmation message
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    // mobile nav
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // framer motion mobile nav variants
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };

    // open confirmation message on successful import
    const openConfirmationMessage = () => {
        setConfirmationOpen(true);
        setTimeout(() => {
            setConfirmationOpen(false);
        }, 4000);
    };

    // handle mobile button click
    const handleButtonClick = () => {
        if(!mobileNavOpen) { setMobileNavOpen(true);}
        else {setMobileNavOpen(false)}
    }

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 bg-light mt-10 flex justify-center rounded-lg border-3 border-dark w-auto max-sm:hidden">
                <nav className="flex items-center w-full">
                    <a href="#/" className="group px-15 py-2 border-r-dark border-r-3 max-md:px-10">
                            <p className="text-sm font-semibold uppercase text-dark group-hover:text-primary lin-transition">Αρχικη</p>
                        </a>

                        <button className={`group ${impDisabled ? 'hover:cursor-default' : 'hover:cursor-pointer'} px-15 py-2 border-r-dark border-r-3 max-md:px-10`} disabled={impDisabled} onClick={(e) => {
                            e.preventDefault(); triggerFileInput();}}>
                            <p className={`text-sm font-semibold uppercase text-dark lin-transition ${impDisabled ? 'pointer-events-none opacity-50' : 'group-hover:text-primary'}
                                    `}>Εισαγωγη</p>
                        </button>

                        <button className={`group ${expDisabled ? 'hover:cursor-default' : 'hover:cursor-pointer'} px-15 py-2 border-r-dark border-r-3 max-md:px-10`} disabled={expDisabled} onClick={(e) => {
                            e.preventDefault(); exportGrades(allCourses);
                        }}>
                            <p className={`text-sm font-semibold uppercase text-dark hover:cursor-pointer lin-transition ${expDisabled ? 'pointer-events-none opacity-50' : 'group-hover:text-primary'}`}>Εξαγωγη</p>
                        </button>

                        <a href="#/about" className="group px-15 py-2 max-md:px-10">
                            <p className="text-sm font-semibold uppercase text-dark group-hover:text-primary lin-transition">σχετικα</p>
                        </a>
                </nav>
            </motion.header>

            <div className="z-200 absolute top-0 mt-10 left-10 sm:hidden">
                <Button Icon={mobileNavOpen ? RiCloseFill : RiMenuLine} handler={handleButtonClick} caption="Μενού Πλοήγησης" variant={2}/>
            </div>

            <AnimatePresence>
                {mobileNavOpen ?
                    (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="z-10 bg-black absolute w-full h-full opacity-60">
                            </motion.div>

                            <motion.header
                                onClick={(e) => e.stopPropagation()}
                                variants={dropIn}
                                initial="hidden"
                                animate="visible"
                                exit="exit"

                                className="z-100 bg-light absolute top-0 mt-10 left-10 right-10 h-auto rounded border-3 border-dark ">

                                <div className="absolute top 0 w-full bg-dark h-9"></div>
                                <div className="mt-10">
                                    <nav>
                                        <div className="px-4 py-2 border-b-dark border-b-3">
                                            <a href="#/" className="group">
                                                <p className="text-sm font-semibold uppercase text-dark group-hover:text-primary lin-transition">αρχικη</p>
                                            </a>
                                        </div>

                                        <div className="px-4 py-2 border-b-dark border-b-3">
                                            <button className={`group ${impDisabled ? 'hover:cursor-default' : 'hover:cursor-pointer'} `} disabled={impDisabled} onClick={(e) => {
                                                e.preventDefault(); triggerFileInput();}}>
                                                <p className={`text-sm font-semibold uppercase text-dark lin-transition ${impDisabled ? 'pointer-events-none opacity-50' : 'group-hover:text-primary'}
                                                `}>εισαγωγη</p>
                                            </button>
                                        </div>

                                        <div className="px-4 py-2 border-b-dark border-b-3">
                                            <button className={`group ${expDisabled ? 'hover:cursor-default' : 'hover:cursor-pointer'} `} disabled={expDisabled} onClick={(e) => {
                                                e.preventDefault(); exportGrades(allCourses);
                                            }}>
                                                <p className={`text-sm font-semibold uppercase text-dark hover:cursor-pointer lin-transition ${expDisabled ? 'pointer-events-none opacity-50' : 'group-hover:text-primary'}`}>εξαγωγη</p>
                                            </button>
                                        </div>

                                        <div className="px-4 py-2">
                                            <a href="#/about" className="group">
                                                <p className="text-sm font-semibold uppercase text-dark group-hover:text-primary lin-transition">σχετικα</p>
                                            </a>
                                        </div>

                                    </nav>
                                </div>
                            </motion.header>
                        </>
                    ) : null
                }
            </AnimatePresence>


            {/* Hidden file input */}
            <input
                id="file-input"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={(event) => {
                    importGrades(event, setUserCourses, setFixedCourses);
                    openConfirmationMessage();
                }}
            />

            <ConfirmationMessage message="Επιτυχής εισαγωγή μαθημάτων!" color="green" isOpen={confirmationOpen} />
        </>
    )
}
export default Header
