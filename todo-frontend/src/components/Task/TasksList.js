import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import Task from '.';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { startSessionCheck, getCookie } from '../../utills/Utill';

function dateCompare ( date1, date2 ) { 
    if ( (date1.getFullYear() === date2.getFullYear()) &&
         (date1.getMonth() === date2.getMonth()) &&
         (date1.getDate() === date2.getDate()) )
        return true
}

export default class TaskList extends React.PureComponent {
    static propTypes = {
        tasksList: PropTypes.instanceOf(List),
        selectDate: PropTypes.instanceOf(Date),
        userId: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        removeTask: PropTypes.func.isRequired,
        getTaskList: PropTypes.func.isRequired,
        logIn: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        if (!this.props.userId)
            this.props.logIn(getCookie('userId'));

        startSessionCheck();
    }
    
    render () {
        if (!this.props.userId)
            return true;

        let AddButton;
        const TasksList = this.props.tasksList.map(
            (List, ListIndex) => {

                if ( dateCompare(List.get('date'), this.props.selectDate)) {
                    AddButton = (
                        <FloatingActionButton
                            onClick = {() => this.props.createTask(this.props.selectDate, this.props.userId, ListIndex)}   
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
                                    onRemove = {this.props.removeTask}
                                    onChangeText = {this.props.onChangeText}
                                    onEdit = {this.props.editTask}
                                />
                            );
                        }
                    );
                }
            }
        );

        if ( !AddButton ) {
            // TODO List 생성 범위 정하기 (ex 2018 ~ 2020 년도 까지)
            this.props.getTaskList(this.props.selectDate, this.props.userId);
        }

        return (
            <div className="TasksList">
                {TasksList}
                {AddButton}
            </div>
        );
    }
}