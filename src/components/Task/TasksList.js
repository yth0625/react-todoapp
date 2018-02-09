import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import Task from '.';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const TasksList = ({tasksList, selectDate, onCheck, onCreate, onRemove, onChangeText, onChangeDuedate, onCreateList}) => {
    let AddButton;
    const TasksList = tasksList.map(
        (List, ListIndex) => {
            if ( List.get('date').getTime() === selectDate.getTime() ) {
                
                AddButton = (
                    <FloatingActionButton
                        onClick = {() => onCreate(ListIndex)}   
                    >
                        <ContentAdd />
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
                                {...task.toJS()}
                                onCheck = {onCheck}
                                onRemove = {onRemove}
                                onChangeText = {onChangeText}
                                onChangeDuedate = {onChangeDuedate}
                            />
                        );
                    }
                );
            }
        }
    );

    if ( !AddButton ) {
        // TODO List 생성 범위 정하기 (ex 2018 ~ 2020 년도 까지)
        onCreateList(selectDate);
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
    onCheck: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onChangeDuedate: PropTypes.func.isRequired,
    onCreateList: PropTypes.func.isRequired
};

export default TasksList;