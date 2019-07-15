import ExportRedmine from '../components/ExportRedmine';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    tasksList: state.taskStorage.get('tasksList'),
    selectDate: state.datePickerStorage.get('selectDate')
});

const TaskListContainer = connect(
    mapStateToProps
)(ExportRedmine);

export default TaskListContainer;