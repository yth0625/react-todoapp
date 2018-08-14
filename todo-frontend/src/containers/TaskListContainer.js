import TasksList from '../components/Task/TasksList';
import * as taskActions from '../modules/tasks';
import * as requestActions from '../modules/request'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    tasksList: state.taskStorage.get('tasksList'),
    selectDate: state.datePickerStorage.get('selectDate'),
    userId: state.userStorage.get('userId')
});

const mapDispatchProps = (dispatch) => ({
    onChangeText: (listIndex, taskIndex, value) => dispatch(taskActions.writetext({listIndex, taskIndex, value})),
    createTask: (date, userId, listIndex) => dispatch(requestActions.createTask(date, userId, listIndex)),
    editTask: (id, task, value, action, listIndex, taskIndex) => dispatch(requestActions.editTask(id, task, value, action, listIndex, taskIndex)),
    removeTask: (id, listIndex, taskIndex) => dispatch(requestActions.removeTask(id, listIndex, taskIndex)),
    getTaskList: (date, id) => dispatch(requestActions.getTaskList(date, id))
});

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(TasksList);

export default TaskListContainer;