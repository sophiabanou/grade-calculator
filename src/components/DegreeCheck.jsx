import {BoxLayout, Button} from "./index.jsx";
import PropTypes from "prop-types";
import {AnimatePresence, motion} from "framer-motion";
import {useLanguageContext, useAppContext} from "../context/Hooks";
import {useEffect, useState} from "react";
import {RiArrowLeftLine, RiEmotionLaughFill, RiEmotionUnhappyFill} from "@remixicon/react";
import {DegreeCheckItem} from "./index.jsx"

const DegreeCheck = ({index}) => {
    const {languageData} = useLanguageContext();
    const {allCourses} = useAppContext();
    const [showStats, setShowStats] = useState(false);

    // flags
    const [hasPassedThInt, setHasPassedThInt] = useState(false);
    const [hasPassedMand, setHasPassedMand] = useState(false);
    const [hasPassedGen, setHasPassedGen] = useState(false);
    const [hasPassedEY, setHasPassedEY] = useState(false);
    const [hasPassedOpt, setHasPassedOpt] = useState(false);
    const [hasPassedProject, setHasPassedProject] = useState(false);
    const [hasPassedCredits, setHasPassedCredits] = useState(false);

    // sizes
    const [thIntPassed, setThIntPassed] = useState(0);
    const [mandSize, setMandSize] = useState(18);
    const [mandPassed, setMandPassed] = useState(0);
    const [genSize, setGenSize] = useState(3);
    const [genPassed, setGenPassed] = useState(0);
    const [eyPassed, setEYPassed] = useState(0);
    const [optPassed, setOptPassed] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);

    const [canGetDegree, setCanGetDegree] = useState(false);

    function checkPassed (course)  {
        return !(course.grade === undefined || course.grade === null || course.grade === "" || course.grade < 5);
    }

    function checkDegree() {
        // check thesis / internship
        const thesis1 = allCourses.find((c) => c.name === "thesis_1");
        const thesis2 = allCourses.find((c) => c.name === "thesis_2");
        const intern1 = allCourses.find((c) => c.name === "internship_1");
        const intern2 = allCourses.find((c) => c.name === "internship_2");

        if((checkPassed(thesis1) && checkPassed(intern1)) ||
            (checkPassed(thesis1) && checkPassed(thesis2)) ||
            (checkPassed(intern1) && checkPassed(intern2))
        ) {
            setHasPassedThInt(true);
        } else {
            setHasPassedThInt(false)
        }

        setThIntPassed(checkPassed(thesis1) || checkPassed(intern1) ? 1 : 0);

        // check mandatory courses
        const mandatory = allCourses.filter((c) => c.category === "ym");
        setMandSize(mandatory.length);
        const mandNotPassedLength = mandatory.filter((c) => !checkPassed(c)).length;
        setMandPassed(mandatory.length - mandNotPassedLength);
        setHasPassedMand(mandNotPassedLength === 0);

        // check general courses
        const general = allCourses.filter((c) => c.category === "gp");
        setGenSize(general.length);
        const genNotPassedLength = general.filter((c) => !checkPassed(c)).length;
        setGenPassed(general.length - genNotPassedLength);
        setHasPassedGen(genNotPassedLength === 0);

        // check elective mandatory courses
        const ey = allCourses.filter((c) => c.category === "ey");
        const eyPassedLength = ey.filter((c) => checkPassed(c)).length;
        setEYPassed(eyPassedLength);
        setHasPassedEY(eyPassedLength >=4)

        // check optional courses
        const opt = allCourses.filter((c) => c.category === "opt");
        const optPassedLength = opt.filter((c) => checkPassed(c)).length;
        setOptPassed(optPassedLength);
        setHasPassedOpt(optPassedLength >=4)

        // check project
        const project = allCourses.filter((c) => c.category === "project").find((d) => checkPassed(d));
        setHasPassedProject(project)

        // check credits
        const passedCredits = allCourses.filter(c => c.grade >= 5).reduce((sum, c) => sum + (c.credits || 0), 0);
        setTotalCredits(passedCredits);
        setHasPassedCredits(passedCredits>=240);
    }


    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowStats((prev) => !prev);
    }

    useEffect(() => {
        setCanGetDegree(hasPassedThInt && hasPassedMand && hasPassedGen && hasPassedEY && hasPassedOpt && hasPassedProject && hasPassedCredits);
    }, [hasPassedThInt, hasPassedMand,hasPassedGen, hasPassedEY, hasPassedOpt, hasPassedProject, hasPassedCredits ]);

    useEffect(() => {
        checkDegree()
    }, [allCourses])

    return (
        <BoxLayout index={index} title={languageData?.degree_check?.title}>
            <div className="w-full h-full flex flex-col justify-center items-center py-2 pb-10 gap-1">
                <AnimatePresence mode="wait">
                    {!showStats ? (
                        <motion.button
                            key="mainButton"
                            onClick={(e) => {handleButtonClick(e)}}
                            whileTap={{ scale: 1 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)" }}
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="circular-gradient rounded-full w-40 h-40  eio-transition cursor-pointer mt-10">
                            <h3 className="font-semibold text-light text-lg max-md:text-base">{languageData?.degree_check?.button}</h3>
                        </motion.button>
                    ):(
                        <motion.div
                            className="w-full"
                            key="statsPanel"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >

                            <Button handler={handleButtonClick} caption={languageData?.degree_check?.back_caption} Icon={RiArrowLeftLine}/>
                            <div className="flex flex-col w-full justify-between border-1 rounded border-gray-100 dark:border-dmode-border">

                                <ul className="w-full p-3 px-4 flex flex-col gap-1">

                                    <DegreeCheckItem flag={hasPassedMand} startPass={mandPassed} end={mandSize} head={languageData?.degree_check?.checks?.ym}/>
                                    <DegreeCheckItem flag={hasPassedGen} startPass={genPassed} end={genSize} head={languageData?.degree_check?.checks?.gp}/>
                                    <DegreeCheckItem flag={hasPassedEY} startPass={eyPassed} end={4}  head={languageData?.degree_check?.checks?.ey}/>
                                    <DegreeCheckItem flag={hasPassedOpt} startPass={optPassed} end={4} head={languageData?.degree_check?.checks?.opt}/>
                                    <DegreeCheckItem flag={hasPassedProject} startPass={1} end={1} startNoPass={0} head={languageData?.degree_check?.checks?.project}/>
                                    <DegreeCheckItem flag={hasPassedThInt} startPass={2} end={2} startNoPass={thIntPassed} head={languageData?.degree_check?.checks?.pe_pa}/>
                                    <DegreeCheckItem flag={hasPassedCredits} startPass={totalCredits} end={240} head={languageData?.degree_check?.checks?.credits}/>

                                </ul>

                                {canGetDegree ? (
                                    <div className="w-full flex justify-center items-center bg-green-100 dark:bg-green-grad p-3">

                                            <p className="max-md:text-sm p-2 text-center break-words flex flex-col items-center gap-2 dark:text-light">
                                                {languageData?.degree_check?.pass_message}
                                                <RiEmotionLaughFill/>
                                            </p>
                                    </div>
                                ): (
                                    <div className="w-full flex justify-center items-center bg-red-100 dark:bg-red-grad p-3">

                                        <p className="max-md:text-sm p-2 text-center break-words flex flex-col items-center gap-2 dark:text-light">
                                            {languageData?.degree_check?.fail_message}
                                            <RiEmotionUnhappyFill/>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </BoxLayout>
    )
}
DegreeCheck.propTypes = {
    index: PropTypes.number.isRequired,
}

export default DegreeCheck
