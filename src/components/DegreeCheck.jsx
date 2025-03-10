import {BoxLayout, Button} from "./index.jsx";
import PropTypes from "prop-types";
import {AnimatePresence, motion} from "framer-motion";
import {useLanguageContext, useAppContext} from "../context/Hooks";
import {useEffect, useState} from "react";
import {RiArrowLeftLine, RiEmotionLaughFill, RiEmotionUnhappyFill} from "@remixicon/react";
import {DegreeCheckItem} from "./index.jsx"

const DegreeCheck = ({index}) => {
    const {languageData} = useLanguageContext();
    const {allCourses, major, specializations} = useAppContext();
    const [showStats, setShowStats] = useState(false);

    console.log(major)
    // degree case
    const [dCase, setDCase] = useState(0);

    useEffect(() => {
        // set degree case depending on specs and major
        if(specializations.length === 1)
        {
            setDCase(1);
        } else if(specializations.length === 2 &&
            (
                (major === "A" && specializations.every(spec => ["S1", "S2", "S3"].includes(spec))) ||
                (major === "B" && specializations.every(spec => ["S4", "S5", "S6"].includes(spec)))
            ))
        {
            setDCase(2);
        } else if (
            specializations.length === 2 &&
            (
                ["S1", "S2", "S3"].includes(specializations[0]) && ["S4", "S5", "S6"].includes(specializations[1]) ||
                ["S4", "S5", "S6"].includes(specializations[0]) && ["S1", "S2", "S3"].includes(specializations[1])
            )
        ) {
            setDCase(3);
        } else if (specializations.length === 0 && major!=='Undecided' && major!=="" && major!==null ) {
            setDCase(4);
        } else {
            setDCase(0);
        }


    }, [specializations, major]);


   const [passedYM, setPassedYM] = useState(0);
   const [passedGP, setPassedGP] = useState(0);
   const [passedPEPA, setPassedPEPA] = useState(false);
   const [passedPEPACount, setPassedPEPACount] = useState(0);
   const [passedEYMx, setPassedEYMx] = useState(0);
   const [passedEYMy, setPassedEYMy] = useState(0);
   const [passedEYM, setPassedEYM] = useState(0);
   const [passedProject, setPassedProject] = useState(false);
   const [passedPMx, setPassedPMx] = useState(0);
   const [passedPMy, setPassedPMy] = useState(0);
   const [passedPM, setPassedPM] = useState(0);
   const [passedCredits, setPassedCredits] = useState(0);
   const [otherEYPM, setOtherEYPM] = useState(0);

    const [xIdx, setXIdx] = useState( 0);

    useEffect(() => {
        setXIdx((major === 'A' && ["S1","S2", "S3"].includes(specializations[0])) ||
        major === 'B' && ["S4","S5", "S6"].includes(specializations[0]) ? 0 : 1);
        } ,[major, specializations])


    const [canGetDegree, setCanGetDegree] = useState(false);

    function checkPassed (course)  {
        return !(course.grade === undefined || course.grade === null || course.grade === "" || course.grade < 5);
    }

    function checkDegree() {
        // check ym courses
        const ym = allCourses.filter((c) => c.category === "ym").filter((c) => checkPassed(c));
        setPassedYM(ym.length);

        // check gp courses
        const gp = allCourses.filter((c) => c.category === "gp").filter((c) => checkPassed(c));
        setPassedGP(gp.length);

        // check thesis / internship
        const thesis1 = allCourses.find((c) => c.name === "thesis_1");
        const thesis2 = allCourses.find((c) => c.name === "thesis_2");
        const intern1 = allCourses.find((c) => c.name === "internship_1");
        const intern2 = allCourses.find((c) => c.name === "internship_2");

        if((checkPassed(thesis1) && checkPassed(intern1)) ||
            (checkPassed(thesis1) && checkPassed(thesis2)) ||
            (checkPassed(intern1) && checkPassed(intern2))
        ) {
            setPassedPEPA(true);
        } else {
            setPassedPEPA(false);
        }

        setPassedPEPACount(checkPassed(thesis1) || checkPassed(intern1) ? 1 : 0);

        // check credits
        const credits = allCourses.filter(c => c.grade >= 5).reduce((sum, c) => sum + (c.credits || 0), 0);
        setPassedCredits(credits);

        const ey = allCourses.filter((c) => c.category === "ey").filter((c) => checkPassed(c));
        const opt = allCourses.filter((c) => c.category === "opt").filter((c) => checkPassed(c));
        const project = allCourses.filter((c) => c.category === "project").filter((c) => checkPassed(c));

        // CASE 1: DEEP KNOWLEDGE OF 1 SPECIALIZATION
        if(dCase === 1) {
            // EYMx
            const EYMx = ey.filter((c) => c.spec.includes(specializations[0]));
            setPassedEYMx(EYMx.length);
            // EYM
            const EYM = ey.filter((a) => a.major[0] === major);
            setPassedEYM(EYM.length);
            // PMx
            const PMx = opt.filter((c) => c.spec.includes(specializations[0]));
            setPassedPMx(PMx.length);
            // PROJECT
            const projectMajor = project.filter((c) => c.major[0] === major);
            setPassedProject(projectMajor.length);

        } else if (dCase === 2 || dCase === 3) {
            let EYMx, EYMy;
            if (dCase === 2) {
                // EYMx , EYMy, EYM
                EYMx = ey.filter((a) => a.major[0] === major).filter((d) => d.spec.includes(specializations[0]));
                EYMy = ey.filter((a) => a.major[0] === major).filter((d) => d.spec.includes(specializations[1]));
                // PROJECT
                const projectMajor = project.filter((c) => c.major[0] === major);
                setPassedProject(projectMajor.length);
            } else if (dCase === 3) {
                EYMx = ey.filter((d) => d.spec.includes(specializations[xIdx]));
                EYMy = ey.filter((d) => d.spec.includes(specializations[1 - xIdx]));
                // PROJECT
                setPassedProject(project.length);
            }

            setPassedEYMx(EYMx.length);
            setPassedEYMy(EYMy.length);

            const EYM = ey.filter((a) => a.major[0] === major);
            setPassedEYM(EYM.length);

            // PMx, PMy, PM
            const PMx = opt.filter((d) => d.spec.includes(specializations[0]));
            const PMy = opt.filter((d) => d.spec.includes(specializations[1]));
            setPassedPMx(PMx.length);
            setPassedPMy(PMy.length);

            const PM = new Set([...PMx, ...PMy]);
            setPassedPM(PM.size);


        } else if (dCase === 4){
            // EYM
            const EYM = ey.filter((a) => a.major[0] === major);
            setPassedEYM(EYM.length);

            // PROJECT
            const projectMajor = project.filter((c) => c.major[0] === major);
            setPassedProject(projectMajor.length);

            // PM
            const PM = opt.filter((a) => a.major[0] === major);
            setPassedPM(PM.length);

            const otherEYPM = ey.length + opt.length - (EYM.length > 4 ? 4 : EYM.length) - (PM.length > 4 ? 4 : PM.length);
            setOtherEYPM(otherEYPM);

        }
    }


    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowStats((prev) => !prev);
    }

    useEffect(() => {

        if(dCase === 1) {
            setCanGetDegree(passedYM >= 18 && passedGP >= 3 && passedEYM >= 4 && passedEYMx >= 2 && passedPMx >= 4 && passedProject >= 1 && passedPEPA && passedCredits >= 240);
        } else if (dCase === 2) {
            setCanGetDegree(passedYM >= 18 && passedGP >= 3 && passedEYM >= 4 && passedEYMx >= 2 && passedEYMy >= 2 && passedPMx >= 4 && passedPMy >=4 && passedPM >=8 && passedProject >= 1 && passedPEPA && passedCredits >= 240);
        } else if (dCase === 3) {
            setCanGetDegree(passedYM >= 18 && passedGP >= 3  && passedEYMx >= 2 && passedEYMy >= 2 && passedPMx >= 4 && passedPMy >=4 && passedPM >=8 && passedProject >= 1 && passedPEPA && passedCredits >= 240);
        } else if (dCase === 4) {
            setCanGetDegree(passedYM >= 18 && passedGP >= 3  && passedEYM >= 4  && otherEYPM >= 4  && passedProject >= 1 && passedPEPA && passedCredits >= 240);
        }
        else {
            setCanGetDegree(false)
        }
    },  [ dCase, passedYM, passedGP, passedEYM, passedEYMx, passedEYMy, passedPM, passedPMx, passedPMy, otherEYPM, passedProject, passedPEPA, passedPEPACount, passedCredits])


    useEffect(() => {
        checkDegree()
    }, [allCourses, major, specializations])

    return (
        <BoxLayout index={index} title={languageData?.degree_check?.title}>
            <div className="w-full h-full flex flex-col justify-center items-center py-2 pb-5 gap-1">

                <AnimatePresence mode="wait">
                    {!showStats ? (
                        <motion.button
                            key="mainButton"
                            onClick={(e) => {handleButtonClick(e)}}
                            whileTap={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)" }}
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
                            <div className="flex gap-3 items-start mb-2">
                                <Button handler={handleButtonClick} caption={languageData?.degree_check?.back_caption} Icon={RiArrowLeftLine}/>
                                <p className="text-primary flex gap-2 text-base max-md:text-sm items-center ">
                                    <span className="font-bold min-w-18 uppercase">{languageData?.degree_check?.cases?.case} {dCase}:</span>
                                    <span className="break-words text-sm">
                                        {
                                            dCase === 1 ? (
                                                languageData?.degree_check?.cases?.case1
                                            ): dCase === 2 ? (
                                                languageData?.degree_check?.cases?.case2
                                            ): dCase === 3 ? (
                                                languageData?.degree_check?.cases?.case3
                                            ): dCase === 4 ? (
                                                languageData?.degree_check?.cases?.case4
                                            ): null
                                        }
                                    </span>

                                </p>
                            </div>


                            <div className="flex flex-col w-full justify-between border-1 rounded border-gray-100 dark:border-dmode-border">

                                <ul className="w-full py-3  flex flex-col gap-1">
                                    {dCase !== 0 && (
                                        <>
                                            {/*YM*/}
                                            <DegreeCheckItem flag={passedYM === 18} startPass={passedYM} end={18} head={languageData?.degree_check?.checks?.ym}/>
                                            {/*GP*/}
                                            <DegreeCheckItem flag={passedGP === 3} startPass={passedGP} end={3} head={languageData?.degree_check?.checks?.gp}/>
                                            <div className="my-2 w-full h-[1px] bg-gray-100 dark:bg-dmode-border"></div>
                                        </>
                                    )}



                                    {
                                        dCase === 1 ? (
                                            <>
                                                {/*EY*/}
                                                <DegreeCheckItem flag={passedEYM >=4} startPass={passedEYM} end={4}
                                                                 head={`${languageData?.degree_check?.checks?.ey} ${major}`}
                                                />
                                                <DegreeCheckItem flag={passedEYMx === 2} startPass={passedEYMx} end={2}
                                                                 head={`${languageData?.degree_check?.checks?.eyx} ${specializations[0]}`}
                                                />
                                                {/*OPT*/}
                                                <DegreeCheckItem flag={passedPMx >= 4} startPass={passedPMx} end={4}
                                                                 head={`${languageData?.degree_check?.checks?.opt} ${specializations[0]}`}
                                                />
                                                {/*PROJECT*/}
                                                <DegreeCheckItem flag={passedProject >= 1} startPass={1} end={1} startNoPass={0} head={languageData?.degree_check?.checks?.project}/>

                                            </>
                                        ) : dCase === 2 ? (
                                            <>
                                                {/*EY*/}
                                                <DegreeCheckItem flag={passedEYMx >=2} startPass={passedEYMx} end={2}
                                                                 head={`${languageData?.degree_check?.checks?.eyx} ${specializations[0]}`}
                                                />
                                                <DegreeCheckItem flag={passedEYMy >=2} startPass={passedEYMy} end={2}
                                                                 head={`${languageData?.degree_check?.checks?.eyx} ${specializations[1]}`}
                                                />
                                                <DegreeCheckItem flag={passedEYM >=4} startPass={passedEYM} end={4}
                                                                 head={`${languageData?.degree_check?.checks?.ey} ${major}`}
                                                />
                                                {/*PM*/}
                                                <DegreeCheckItem flag={passedPMx >= 4 && passedPMy >=4 && passedPM >=8} startPass={1} startNoPass={0} end={1} head={languageData?.degree_check?.checks?.opt2}/>
                                                {/*PROJECT*/}
                                                <DegreeCheckItem flag={passedProject >= 1} startPass={1} end={1} startNoPass={0} head={languageData?.degree_check?.checks?.project}/>

                                            </>
                                        ) : dCase === 3 ? (
                                            <>
                                                {/*EY*/}
                                                <DegreeCheckItem flag={passedEYMx >=2} startPass={passedEYMx} end={2}
                                                                 head={`${languageData?.degree_check?.checks?.eyx} ${specializations[xIdx]}`}
                                                />
                                                <DegreeCheckItem flag={passedEYMy >=2} startPass={passedEYMy} end={2}
                                                                 head={`${languageData?.degree_check?.checks?.eyx} ${specializations[1-xIdx]}`}
                                                />
                                                {/*OPT*/}
                                                <DegreeCheckItem flag={passedPMx >= 4 && passedPMy >=4 && passedPM >=8} startPass={1} startNoPass={0} end={1} head={languageData?.degree_check?.checks?.opt2}/>
                                                {/*PROJECT*/}
                                                <DegreeCheckItem flag={passedProject >= 1} startPass={1} end={1} startNoPass={0} head={languageData?.degree_check?.checks?.project}/>
                                            </>
                                        ) : dCase === 4 ? (
                                            <>
                                                {/*EY*/}
                                                <DegreeCheckItem flag={passedEYM >=4} startPass={passedEYM} end={4}
                                                                 head={`${languageData?.degree_check?.checks?.ey} ${major}`}
                                                />
                                                {/*PM*/}
                                                <DegreeCheckItem flag={passedPM >=4} startPass={passedPM} end={4}
                                                                 head={`${languageData?.degree_check?.checks?.optm} ${major}`}
                                                />
                                                {/*PM+EY*/}
                                                <DegreeCheckItem flag={otherEYPM >=4} startPass={otherEYPM} end={4} head={languageData?.degree_check?.checks?.extra}
                                                />
                                                {/*PROJECT*/}
                                                <DegreeCheckItem flag={passedProject >= 1} startPass={1} end={1} startNoPass={0} head={languageData?.degree_check?.checks?.project}/>
                                            </>
                                        ) : (
                                            <p className="w-full text-center py-22">
                                                {languageData?.degree_check?.no_major}.
                                            </p>
                                        )
                                    }

                                    {dCase !== 0 && (
                                        <>
                                            <div className="my-2 w-full h-[1px] bg-gray-100 dark:bg-dmode-border"></div>

                                            {/*THESIS / INTERNSHIP*/}
                                            <DegreeCheckItem flag={passedPEPA} startPass={2} end={2} startNoPass={passedPEPACount} head={languageData?.degree_check?.checks?.pe_pa}/>
                                            {/*TOTAL CREDITS*/}
                                            <DegreeCheckItem flag={passedCredits >= 240} startPass={passedCredits} end={240} head={languageData?.degree_check?.checks?.credits}/>
                                        </>
                                    )}

                                </ul>

                                {
                                    dCase !== 0 && (
                                        <>
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
                                        </>
                                    )
                                }
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
