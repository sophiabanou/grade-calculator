import PropTypes from "prop-types";

const Input = ({type, handler, hasError, onKeyDown=null,   title="", value, data=[]}) => {
    return (
        <>
            {(type === "text") ? (
                <input
                        type="text"
                        placeholder={title}
                        value={value || ""}
                        id={title}
                        onChange={handler}
                        className={`w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1  outline-1 outline-transparent
                                hover:border-dark focus:border-dark focus:bg-light focus:outline-dark 
                                ${hasError ? "border-red-700 bg-light" : "border-transparent"}`}
                    />
                ) : (type === "number") ? (
                    <input
                        type="number"
                        placeholder={title}
                        value={value || ""}
                        id={title}
                        onChange={handler}
                        onKeyDown={onKeyDown}
                        className={` w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                            hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                            ${hasError ? "border-red-700 bg-light" : "border-transparent" } `}
                    />
                ) : (type === "select") ? (
                    <select
                        value={value || ""}
                        onChange={handler}
                        className={`w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                             hover:border-dark focus:border-dark focus:bg-light focus:outline-dark hover:cursor-pointer
                             ${hasError ? "border-red-700 bg-light" : "border-transparent" }`}
                    >
                        <option value="">Select Category</option>
                        {data.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                ) : null
            }
        </>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    onKeyDown: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
    data: PropTypes.array,
};

export default Input
