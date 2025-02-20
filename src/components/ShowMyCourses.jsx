import {RiUserLine} from "@remixicon/react";
import {Button} from "./index.jsx";
import {useAppContext, useLanguageContext} from "../context/Hooks";

const ShowMyCourses = () => {
    const {showMyCoursesOpen, setShowMyCoursesOpen} = useAppContext();
    const {languageData} = useLanguageContext();

    const handleButtonClick = () => {
        setShowMyCoursesOpen(!showMyCoursesOpen);
    }
    return (
        <div>
            <Button variant={showMyCoursesOpen ? 3 : 2}
                    Icon={RiUserLine}
                    handler={handleButtonClick}
                    caption={languageData?.toolbar?.my_courses}/>
        </div>
    )
}
export default ShowMyCourses
