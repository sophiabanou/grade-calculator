import PropTypes from "prop-types";
import {useLanguageContext} from "../context/Hooks";

const Filter = ({ selectedOption, setSelectedOption, data, title }) => {
    const {languageData} = useLanguageContext();

    const handleChange = (e) => {
        console.log(e.target.value);
        setSelectedOption(e.target.value);
    }

    return (
        <>
            <select
                value={selectedOption}
                onChange={handleChange}
                className="dark:bg-dmode-input dark:border-dmode-input  dark:text-dark-grey max-h-10 max-w-[300px]  p-2 pl-4 pr-2 bg-light rounded border-1 border-dark outline-none
                    lin-transition  w-[16vw]  hover:cursor-pointer max-md:px-1 max-md:text-sm max-md:w-[17vw] "
            >
                <option value="All">{title}</option>
                {data.map((item) => (
                    <option key={String(item)} value={String(item)} >
                        {languageData?.filters?.[item] || item}
                    </option>
                ))}
            </select>
        </>
    )
}

Filter.propTypes = {
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    hasMisc: PropTypes.bool,
}

export default Filter

