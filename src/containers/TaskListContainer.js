import TasksList from '../components/Task/TasksList';
//import * as action from 'moudles';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    tasksList: state.taskStorage.get('tasksList'),
    selectDate: state.taskStorage.get('selectDate')
});

const TaskListContainer = connect(
    mapStateToProps
)(TasksList);

export default TaskListContainer;