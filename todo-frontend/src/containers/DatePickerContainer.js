import TasksList from '../components/DatePicker';
import * as actions from '../modules/datepicker';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    selectDate: state.datePickerStorage.get('selectDate')
});


const mapDispatchProps = (dispatch) => ({
    onChangeDate: (date) => dispatch(actions.selectdate(date))
});

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchProps
)(TasksList);

export default TaskListContainer;