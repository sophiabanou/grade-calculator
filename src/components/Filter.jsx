import PropTypes from "prop-types";
import useLanguageContext from "../context/useLanguageContext";

const Filter = ({ selectedOption, setSelectedOption, data, title}) => {
    const {languageData} = useLanguageContext();

    return (
        <>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="max-h-10 max-w-[250px] ml-2 p-2 pl-4 pr-2 bg-light rounded border-1 border-dark outline-none
                    lin-transition  w-[15vw]  hover:cursor-pointer max-md:px-1 max-md:text-sm max-md:w-[17vw] "
            >
                <option value="All">{title}</option>
                {data.map((item) => (
                    <option key={String(item)} value={String(item)} >
                        {languageData?.filters?.[item]}
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

