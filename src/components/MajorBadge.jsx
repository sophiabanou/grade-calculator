import PropTypes from "prop-types";

const MajorBadge = ({course}) => {
    const major = course?.major;
    const spec = course?.spec;

    return (
        <div className="ml-8 flex gap-1">
            <>
                {major[0]!== 'all' ?(
                    <div className={`${major[0] === 'A'? "bg-red-300 dark:bg-badge-red": "bg-purple-300 dark:bg-badge-purple" }  px-2 rounded-lg`}>
                        <p className="text-xs text-light font-semibold">{major[0]}</p>
                    </div>
                ) : null}
            </>
            <>
                {spec && spec[0] !== "all" ? (
                    spec.map((s) => (
                        <div key={s} className="bg-gray-100 px-2 rounded-lg dark:bg-dmode-input">
                            <p className="text-xs text-gray-400 dark:text-dark-grey font-semibold">{s}</p>
                        </div>
                    ))
                ) : null}
            </>

        </div>
    )
}

MajorBadge.propTypes = {
    course: PropTypes.object.isRequired,
}

export default MajorBadge
