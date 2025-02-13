import {AddNewGrade, ClassList, BoxLayout, Stats} from "../components";
import useAppContext from "../context/useAppContext.jsx";



export default function Home() {

  const {classes, fixedClasses} = useAppContext();

  const allClasses = [...classes, ...fixedClasses.map(fc => ({ ...fc, isFixed: true }))];

  const totalEcts = allClasses.reduce((sum, c) => {
    if (parseInt(c.grade) >= 5) { // Only sum if grade is above 5
      return sum + parseInt(c.ects);
    }
    return sum;
  }, 0);

  // const weightedGrade =
  //     totalEcts > 0
  //         ? classes.reduce((sum, c) => sum + parseInt(c.ects) * parseInt(c.grade), 0) / totalEcts
  //         : 0;

  const degreeEcts = 240;
  const ectsProgress = Math.min((totalEcts / degreeEcts) * 100, 100);



  return (
      <>
        <div className="w-[70vw] max-xl:w-[80vw] flex flex-col gap-7 absolute top-40 pb-40">
          <div className="w-full flex gap-10 max-md:flex-col">
            <AddNewGrade index={1}/>
            <Stats index={2} />
          </div>

          <ClassList index={3}/>
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
