import PropTypes from "prop-types";
import {RiCheckboxCircleLine, RiCloseCircleLine, RiHourglassLine} from "@remixicon/react";

const Status = ({status}) => {
    return (
        <>
            {
                (status==="Pending") ? (
                    <div className="text-gray-200">
                        <RiHourglassLine size={16}/>
                    </div>
                ) : (status==="Passed") ? (
                    <div className="text-green-400">
                        <RiCheckboxCircleLine size={16}/>
                    </div>
                ) : (status==="Failed") ? (
                    <div className="text-red-400">
                        <RiCloseCircleLine size={16}/>
                    </div>
                ) :null
            }
        </>

    )
}

Status.propTypes = {
    status: PropTypes.string.isRequired
}

export default Status
