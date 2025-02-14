import {AddNewCourse, CourseList, ProgressBar, Stats} from "../components";
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
          <ProgressBar totalCredits={totalCredits} degreeCredits={degreeCredits} creditsProgress={creditsProgress} />
      </>
  );
}
