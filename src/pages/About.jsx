import {BoxLayout} from "../components"
import {useLanguageContext} from "../context/Hooks"

const About = () => {
    const {languageData} = useLanguageContext()

    return (
        <div className="h-min min-h-screen w-[70vw] max-xl:w-[80vw] max-md:w-[86vw] max-md:gap-5 flex flex-col gap-7 mt-40 pb-40">
            <BoxLayout title={languageData?.about?.title} index={1}>
                <p className="text-center">{languageData?.about?.text} <span className="font-bold">sophiabanou@hotmail.com</span></p>
            </BoxLayout>
        </div>
    )
}
export default About
