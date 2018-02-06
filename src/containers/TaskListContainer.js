import TasksList from '../components/Task/TasksList';
import * as actions from '../modules/tasks';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    tasksList: state.taskStorage.get('tasksList'),
    selectDate: state.taskStorage.get('selectDate')
});


const mapDispatchProps = (dispatch) => ({
    onCheck: (listIndex, taskIndex) => dispatch(actions.oncheck({listIndex,taskIndex})),
    onCreate: (listIndex) => dispatch(actions.create(listIndex)),
    onRemove: (listIndex, taskIndex) => dispatch(actions.remove({listIndex, taskIndex})),
    onChangeText: (listIndex, taskIndex, e) => dispatch(actions.writetext({listIndex, taskIndex, e}))
});

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(TasksList);

export default TaskListContainer;