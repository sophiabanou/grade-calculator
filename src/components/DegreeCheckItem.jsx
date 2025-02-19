import PropTypes from "prop-types";

const DegreeCheckItem = ({head, flag, startPass, end, startNoPass = startPass}) => {
    return (
        <li className="flex gap-2 w-full flex justify-between items-end dark:text-dark-grey dark:font-light">
            <p className="max-md:text-sm max-lg:w-50 break-words ">{head}:</p>
            {flag ? (
                <div>
                    <p className="max-md:text-sm text-green-500 ">{startPass}/{end}</p>
                </div>
            ) : (
                <div>
                    <p className="max-md:text-sm text-red-500">{startNoPass}/{end}</p>
                </div>
            )}
        </li>
    )
}

DegreeCheckItem.propTypes = {
    head: PropTypes.string.isRequired,
    flag: PropTypes.bool.isRequired,
    startPass: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    startNoPass: PropTypes.number,
}
export default DegreeCheckItem
