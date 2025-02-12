import { useState, useEffect } from "react";
import {AddNewGrade, ClassList} from "../components/index.jsx";
import {useAppContext} from "../context/AppContext.jsx";


export default function Home() {

  const {classes, setClasses, categories} = useAppContext();

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);


  const totalEcts = classes.reduce((sum, c) => sum + c.ects, 0);
  const weightedGrade =
      totalEcts > 0
          ? classes.reduce((sum, c) => sum + c.ects * c.grade, 0) / totalEcts
          : 0;

  const degreeEcts = 240;
  const ectsProgress = Math.min((totalEcts / degreeEcts) * 100, 100);





  return (
      <>
        <div className="flex gap-10 absolute top-40 max-md:flex-col">
          <AddNewGrade index={1}/>
          <ClassList index={2}/>
        </div>


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
