import TasksList from '../components/Task/TasksList';
import * as taskAactions from '../modules/tasks';
import * as requestActions from '../modules/request'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    tasksList: state.taskStorage.get('tasksList'),
    selectDate: state.datePickerStorage.get('selectDate')
});

const mapDispatchProps = (dispatch) => ({
    onChangeText: (listIndex, taskIndex, value) => dispatch(taskAactions.writetext({listIndex, taskIndex, value})),
    createTask: (date, listIndex) => dispatch(requestActions.createTask(date, listIndex)),
    editTask: (id, task, value, action, listIndex, taskIndex) => dispatch(requestActions.editTask(id, task, value, action, listIndex, taskIndex)),
    removeTask: (id, listIndex, taskIndex) => dispatch(requestActions.removeTask(id, listIndex, taskIndex)),
    getTaskList: (date) => dispatch(requestActions.getTaskList(date))
});

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(TasksList);

export default TaskListContainer;