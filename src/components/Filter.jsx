import PropTypes from "prop-types";

const Filter = ({ selectedOption, setSelectedOption, data, title, hasMisc = false}) => {
    return (
        <>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="max-h-10 ml-2 p-2 pl-4 pr-10 bg-light rounded border-1 border-dark outline-none
                    lin-transition  w-[15vw]  hover:cursor-pointer"
            >
                <option value="All">{title}</option>
                {data.map((item) => (
                    <option key={item} value={item} >
                        {item}
                    </option>
                ))}
                {hasMisc && (
                    <option value="Άλλα">Άλλα</option>
                )}
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

