import BoxLayout from "./BoxLayout.jsx";
import useAppContext from "../context/useAppContext.jsx";
import { AnimatePresence } from "framer-motion";
import {ClassItem} from "../components";
import PropTypes from 'prop-types';
import {categories} from "../data";

const ClassList = ({ index }) => {
    const {allClasses, componentKey} = useAppContext();

    // group classes by category
    const groupedClasses = categories.reduce((acc, category) => {
        acc[category] = allClasses.filter((c) => c.category === category);
        return acc;
    }, {});

    for (let category in groupedClasses) {
        groupedClasses[category].sort((a, b) => a.name.localeCompare(b.name));
    }

    // add a category for misc classes
    groupedClasses["Άλλα"] = allClasses.filter((c) => !c.category || !categories.includes(c.category));


    return (
        <BoxLayout title="Classes" index={index}>
            <div className="overflow-y-auto">
                {Object.keys(groupedClasses).map((category) => {
                    if (groupedClasses[category].length === 0) return null;
                    return (
                        <div key={category} className="mb-4 pt-4 rounded-md ">
                            <h3 className="w-full text-lg brounded text-primary wrap font-bold text-light py-2 px-2">{category}</h3>
                            <div className="space-y-3 rounded">
                                <AnimatePresence>
                                    {groupedClasses[category].map((c) => {
                                        return (
                                            <ClassItem key={c.id + componentKey} c={c} />
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </BoxLayout>
    );
};

ClassList.propTypes = {
    index: PropTypes.number.isRequired,
};

export default ClassList;
