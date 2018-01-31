import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import Task from './Task';
 
const TasksList = ({tasksList, selectDate}) => {
    const TasksList = tasksList.map(
        (List) => {
            const tasks = List.get('tasks');
            if ( tasks.getIn([0, 'date']) === selectDate ) {
                return tasks.map(
                    (task, i) => {
                        if ( i !== 0 ) {
                            return (
                                <Task
                                    key = {i}
                                    index = {i}
                                    {...task.toJS()}
                                />);
                        }
                    }
                );
            }
        }
    );

    return (
        <div className="TasksList">
            {TasksList}
        </div>
    );
};

TasksList.propTypes = {
    tasksList: PropTypes.instanceOf(List),
    selectDate: PropTypes.string
};

TasksList.defaultProps = {
    tasks: []
};


export default TasksList;