import { BoxLayout , CreditsProgressChart} from "./index.jsx";
import PropTypes from "prop-types";
import useAppContext from "../context/useAppContext.jsx";
import { useMemo } from "react";

const Stats = ({ index }) => {
    const { allCourses, translate } = useAppContext();

    const totalCourses = allCourses.length;
    const passed = allCourses.filter(c => c.grade >= 5).length;
    const failed = allCourses.filter(c => c.grade < 5 && c.grade != null).length;

    const totalPassedCredits = allCourses.filter(c => c.grade >= 5).reduce((sum, c) => sum + (c.credits || 0), 0);
    const passRate = ((totalPassedCredits / 240) * 100).toFixed(2);

    const weightedGrade = useMemo(() => {
        const gradedCourses = allCourses.filter(c => c.grade >= 5 && c.credits);
        const totalWeight = gradedCourses.reduce((sum, c) => sum + c.credits, 0);
        const weightedSum = gradedCourses.reduce((sum, c) => sum + (c.grade * c.credits), 0);
        return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : "N/A";
    }, [allCourses]);

    return (
        <BoxLayout title={translate("stats.title")} index={index}>
            <div className="grid grid-cols-3 gap-4 py-2 text-[15px] max-md:text-sm">
                <div className="max-md:p-3 p-2 border-1 border-gray-100 rounded text-center flex flex-col justify-start">
                    <p className="text-xl max-md:text-lg font-bold h-8 text-gray-500 ">{totalCourses}</p>
                    <p className="break-words">{translate("stats.total-courses")}</p>
                </div>
                <div className="max-md:p-3 p-2 border-1 border-green-100 rounded text-center flex flex-col justify-start">
                    <p className="text-xl max-md:text-lg font-bold h-8 text-green-500">{passed}</p>
                    <p className="break-words">{translate("stats.passed")}</p>
                </div>
                <div className="max-md:p-3 p-2 border-1 border-red-100 rounded text-center flex flex-col justify-start">
                    <p className="text-xl max-md:text-lg font-bold h-8 text-red-500">{failed}</p>
                    <p className="break-words">{translate("stats.failed")}</p>
                </div>
            </div>

            <div className="flex flex-row gap-6 w-full mt-2 border-1 border-gray-100 rounded py-2 px-3">
                <div className="w-full flex flex-row items-center justify-between gap-6 ">
                    <div className="w-full">
                        <CreditsProgressChart credits={totalPassedCredits} />
                    </div>

                    <div className="flex flex-col w-full  rounded pr-2">
                        <div className="flex flex-col items-start justify-center p-2  rounded-t text-start w-full max-w-xs">
                            <p className="w-17 max-md:w-18 text-xl font-bold text-dark text-shadow">{weightedGrade}</p>
                            <p className="text-base max-md:text-sm text-gray-600">{translate("stats.degree-grade")}</p>
                        </div>

                        <div className="flex flex-col items-start justify-center p-2  rounded-t text-start w-full  max-w-xs ">
                            <p className="w-17 max-md:w-18 text-xl font-bold text-dark ">{passRate}%</p>
                            <p className="text-base max-md:text-sm text-gray-600">{translate("stats.pass-rate")}</p>
                        </div>
                    </div>

                </div>
            </div>

        </BoxLayout>
    );
};

Stats.propTypes = {
    index: PropTypes.number.isRequired,
};

export default Stats;
