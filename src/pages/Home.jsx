import { useState, useEffect } from "react";
import { RiCloseFill } from "@remixicon/react";
import { Header, AddNewGrade, BoxLayout} from "../components/index.jsx";
import {useAppContext} from "../context/AppContext.jsx";


export default function Home() {

  const {classes, setClasses, categories} = useAppContext();

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);


  const deleteClass = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const totalEcts = classes.reduce((sum, c) => sum + c.ects, 0);
  const weightedGrade =
      totalEcts > 0
          ? classes.reduce((sum, c) => sum + c.ects * c.grade, 0) / totalEcts
          : 0;

  const degreeEcts = 240;
  const ectsProgress = Math.min((totalEcts / degreeEcts) * 100, 100);


  // Grouping classes by category
  const groupedClasses = categories.reduce((acc, category) => {
    acc[category] = classes.filter((c) => c.category === category);
    return acc;
  }, {});

  // Sorting classes within each category (optional if you want a specific order)
  for (let category in groupedClasses) {
    groupedClasses[category].sort((a, b) => a.name.localeCompare(b.name)); // Sort by class name within each category
  }


  return (
      <>
        <AddNewGrade />

        {/*<BoxLayout title="Grades">*/}
        {/*  <div className="max-h-50 overflow-y-scroll">*/}
        {/*    {Object.keys(groupedClasses).map((category) => {*/}
        {/*      if (groupedClasses[category].length === 0) return null; // Skip empty categories*/}
        {/*      return (*/}
        {/*          <div key={category} className="mb-4">*/}
        {/*            <h3 className="text-xl font-semibold text-primary mb-2">{category}</h3>*/}
        {/*            <ul>*/}
        {/*              {groupedClasses[category].map((c, index) => (*/}
        {/*                  <li key={index} className="flex justify-between p-2 border-b">*/}
        {/*              <span>*/}
        {/*                {c.name} ({c.ects} ECTS) - {c.grade}*/}
        {/*              </span>*/}
        {/*                    <button*/}
        {/*                        onClick={() => deleteClass(index)}*/}
        {/*                        className="text-white bg-pink rounded-full hover:cursor-pointer hover:bg-pink-dark flex justify-center items-center w-6 h-6 ease-linear duration-300"*/}
        {/*                    >*/}
        {/*                      <RiCloseFill size={18} />*/}
        {/*                    </button>*/}
        {/*                  </li>*/}
        {/*              ))}*/}
        {/*            </ul>*/}
        {/*          </div>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </div>*/}
        {/*</BoxLayout>*/}

          {/*<div className="mt-4 p-3 bg-gray-100 rounded border-1 border-secondary">*/}
          {/*  <p>*/}
          {/*    <strong>Total ECTS:</strong> {totalEcts}*/}
          {/*  </p>*/}
          {/*  <p>*/}
          {/*    <strong>Weighted Grade:</strong> {weightedGrade.toFixed(2)}*/}
          {/*  </p>*/}
          {/*</div>*/}



        <div className="mt-20 fixed bottom-0 w-full">
          <p className="font-semibold text-dark text-center text-lg mb-2 px-4">
            <span className="font-bold">Progress:</span> {totalEcts} / {degreeEcts}
          </p>
          <div className="w-full bg-light h-5 overflow-hidden">
            <div
                className="bg-primary h-full"
                style={{ width: `${ectsProgress}%` }}
            ></div>
          </div>
        </div>
  </>
  );
}
