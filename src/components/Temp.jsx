import PropTypes from "prop-types";
import {BoxLayout} from "./index.jsx";

const Temp = (index) => {
    return (
        <BoxLayout title="temp" index={index}>

        </BoxLayout>
    )
}

Temp.propTypes = {
    index: PropTypes.number.isRequired,
}

export default Temp
