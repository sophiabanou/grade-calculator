import PropTypes from "prop-types";
import {useLanguageContext} from "../context/Hooks";

const Input = ({type, handler, hasError, onKeyDown=null,   title="", value, data=[]}) => {
    const {languageData} = useLanguageContext();

    console.log(data)
    return (
        <>
            {(type === "text") ? (
                <input
                        type="text"
                        placeholder={title}
                        value={value || ""}
                        id={title}
                        onChange={handler}
                        className={`dark:bg-dmode-input dark:font-light dark:focus:bg-dmode-input dark:text-light dark:placeholder-dark-grey  dark:hover:border-dmode-border dark:focus:border-dmode-border dark:focus:outline-dmode-border max-md:text-sm w-full p-2 px-4 bg-gray-100 
                        rounded eio-transition border-1  outline-1 outline-transparent 
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
                        className={`dark:bg-dmode-input dark:font-light dark:focus:bg-dmode-input dark:text-light dark:placeholder-dark-grey dark:hover:border-dmode-border dark:focus:border-dmode-border dark:focus:outline-dmode-border max-md:text-sm w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                            hover:border-dark focus:border-dark focus:bg-light focus:outline-dark appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                            ${hasError ? "border-red-700 bg-light" : "border-transparent" } `}
                    />
                ) : (type === "select") ? (
                    <select
                        value={value || ""}
                        onChange={handler}
                        className={`dark:bg-dmode-input dark:font-light dark:focus:bg-dmode-input dark:text-dark-grey dark:hover:border-dmode-border dark:focus:border-dmode-border dark:focus:outline-dmode-border max-md:text-sm w-full p-2 px-4 bg-gray-100 rounded eio-transition border-1 outline-1 outline-transparent
                             hover:border-dark focus:border-dark focus:bg-light focus:outline-dark hover:cursor-pointer
                             ${hasError ? "border-red-700 bg-light" : "border-transparent" }`}
                    >
                        <option value="">{title}</option>
                        {data.map((cat, index) => (
                            <option key={index} value={cat}>
                                {   cat === 'all' ? (languageData?.new_course?.all) :
                                    languageData?.filters?.[cat] || cat
                                }
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
