import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import Task from './Task';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

let listIndex = '';
const TasksList = ({tasksList, selectDate, onCheck, onCreate, onRemove, onChangeText}) => {
    const TasksList = tasksList.map(
        (List, ListIndex) => {
            if ( List.get('date') === selectDate ) {
                const tasks = List.get('tasks');
                return tasks.map(
                    (task, i) => {
                        listIndex = ListIndex;
                        return (
                            <Task
                                key = {i}
                                listIndex = {listIndex}
                                taskIndex = {i}
                                {...task.toJS()}
                                onCheck = {onCheck}
                                onRemove = {onRemove}
                                onChangeText = {onChangeText}
                            />
                        );
                    }
                );
            }
        }
    );

    const AddButton = (
        <FloatingActionButton
            onClick = {() => onCreate(listIndex)}    
        >
            <ContentAdd />
        </FloatingActionButton>
    )

    return (
        <div className="TasksList">
            {TasksList}
            {AddButton}
        </div>
    );
};

TasksList.propTypes = {
    tasksList: PropTypes.instanceOf(List),
    selectDate: PropTypes.string,
    onCheck: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onChangeText: PropTypes.func
};

TasksList.defaultProps = {
    tasks: [],
    selectDate: '',
    onCheck: () => console.warn('onCheck not  defined'),
    onCreate: () => console.warn('onCreate not  defined'),
    onRemove: () => console.warn('onRemove not  defined'),
    onChangeText: () => console.warn('onChangeText not  defined')
};


export default TasksList;