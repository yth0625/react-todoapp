import React from 'react';
import PropTypes from 'prop-types';

const Task = ({index, check, text, duedate}) => {
    console.log('call');
    return (
        <div
            className = 'Task'
        >
            index: {index}
            <br/>
            check :{check}
            <br/>
            {text}
            <br/>
            duedate: {duedate}
        </div>
    );
};

Task.propTypes = {
    index: PropTypes.number,
    text: PropTypes.string,
    duedate: PropTypes.string,
    check: PropTypes.bool
};

export default Task;