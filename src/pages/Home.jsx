import { AddNewCourse, CourseList, Stats } from "../components";
import useAppContext from "../context/useAppContext.jsx";

export default function Home() {
  const { allCourses } = useAppContext();

  // calculate total credits
  const calculateTotalCredits = (courses) => {
    return courses.reduce((sum, c) => {
      if (parseInt(c.grade) >= 5) {
        return sum + parseInt(c.credits);
      }
      return sum;
    }, 0);
  };

  const totalCredits = calculateTotalCredits(allCourses);
  const degreeCredits = 240;
  const creditsProgress = Math.min((totalCredits / degreeCredits) * 100, 100);

  return (
      <>
        <div className="w-[70vw] max-xl:w-[80vw] max-md:w-[86vw] max-md:gap-5 flex flex-col gap-7 absolute top-40 pb-40">
          <div className="w-full flex gap-10 max-md:flex-col max-md:gap-5">
            <AddNewCourse index={1} />
            <Stats index={2} />
          </div>

          <CourseList index={3} />

        </div>

        <div className="mt-20 fixed bottom-0 w-full flex flex-col items-start">
          <p className="font-semibold text-light text-center text-lg rounded-tr  px-8 py-1 w-auto gap-3 bg-dark flex flex-row">
              <span className="font-bold ">Πρόοδος:</span>
              <span className="">{totalCredits} / {degreeCredits}</span>
          </p>
          <div className="w-full bg-light h-5 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${creditsProgress}%` }}></div>
          </div>
        </div>
      </>
  );
}
