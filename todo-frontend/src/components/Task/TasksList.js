import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import Task from '.';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

function dateCompare ( date1, date2 ) {
    if ( (date1.getFullYear() === date2.getFullYear()) &&
         (date1.getMonth() === date2.getMonth()) &&
         (date1.getDate() === date2.getDate()) )
        return true
}

const TasksList = ({tasksList, selectDate, onChangeText, createTask, editTask, removeTask, getTaskList}) => {
    let AddButton;
    const TasksList = tasksList.map(
        (List, ListIndex) => {

            if ( dateCompare(List.get('date'), selectDate)) {
                AddButton = (
                    <FloatingActionButton
                        onClick = {() => createTask(selectDate, ListIndex)}   
                    >
                        <ContentAdd/>
                    </FloatingActionButton>
                )

                const tasks = List.get('tasks');
                return tasks.map(
                    (task, i) => {
                        return (
                            <Task
                                key = {i}
                                listIndex = {ListIndex}
                                taskIndex = {i}
                                task = {task.toJS()}
                                onRemove = {removeTask}
                                onChangeText = {onChangeText}
                                onEdit = {editTask}
                            />
                        );
                    }
                );
            }
        }
    );

    if ( !AddButton ) {
        // TODO List 생성 범위 정하기 (ex 2018 ~ 2020 년도 까지)
        getTaskList(selectDate);
    }

    return (
        <div className="TasksList">
            {TasksList}
            {AddButton}
        </div>
    );
};

TasksList.propTypes = {
    tasksList: PropTypes.instanceOf(List),
    selectDate: PropTypes.instanceOf(Date),
    onChangeText: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    getTaskList: PropTypes.func.isRequired
};

export default TasksList;