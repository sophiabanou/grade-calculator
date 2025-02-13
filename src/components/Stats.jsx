import { BoxLayout } from "./index.jsx";
import PropTypes from "prop-types";
import useAppContext from "../context/useAppContext.jsx";
import {useMemo} from "react";

const Stats = ({ index }) => {
    const { allClasses } = useAppContext();

    const totalClasses = allClasses.length;
    const passed = allClasses.filter(c => c.grade >= 5).length;
    const failed = allClasses.filter(c => c.grade < 5 && c.grade != null).length;
    // const pending = allClasses.filter(c => c.grade === null).length;

    const totalPassedCredits = allClasses.filter(c => c.grade >= 5).reduce((sum, c) => sum + (c.ects || 0), 0);

    const passRate = ((totalPassedCredits / 240) * 100).toFixed(2);

    const weightedGrade = useMemo(() => {
        const gradedClasses = allClasses.filter(c => c.grade >= 5).filter(c => c.ects); // Only consider passed courses
        const totalWeight = gradedClasses.reduce((sum, c) => sum + c.ects, 0);
        const weightedSum = gradedClasses.reduce((sum, c) => sum + (c.grade * c.ects), 0);
        return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : "N/A"; // Normalize by 240 ECTS
    }, [allClasses]);




    return (
        <BoxLayout title="Statistics" index={index}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 text-dark text-sm">
                {/* Total Classes */}
                <div className="p-3 bg-gray-100 rounded-lg text-center">
                    <p className="text-lg font-bold">{totalClasses}</p>
                    <p>Σύνολο Μαθημάτων</p>
                </div>

                {/* Passed */}
                <div className="p-3 bg-green-100 rounded-lg text-center">
                    <p className="text-lg font-bold">{passed}</p>
                    <p>Περασμένα</p>
                </div>

                {/* Failed */}
                <div className="p-3 bg-red-100 rounded-lg text-center">
                    <p className="text-lg font-bold">{failed}</p>
                    <p>Αποτυχημένα</p>
                </div>

                {/* Pending */}
                <div className="p-3 bg-yellow-100 rounded-lg text-center">
                    <p className="text-lg font-bold">{weightedGrade}</p>
                    <p>Βαθμός Πτυχίου</p>
                </div>

                {/* Pass Rate */}
                <div className="col-span-2 md:col-span-4 p-3 bg-blue-100 rounded-lg text-center">
                    <p className="text-lg font-bold">{passRate}%</p>
                    <p>Ποσοστό Επιτυχίας</p>
                </div>
            </div>
        </BoxLayout>
    );
};

Stats.propTypes = {
    index: PropTypes.number.isRequired,
};

export default Stats;
