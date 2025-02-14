import { useInView } from 'react-intersection-observer';
import CourseItem from './CourseItem';
import PropTypes from "prop-types";

const LazyCourseItem = ({ course }) => {
    // lazy load items
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={inView ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
        >
            <CourseItem c={course} />
        </div>
    );
};

LazyCourseItem.propTypes = {
    course: PropTypes.object.isRequired,
}

export default LazyCourseItem;
