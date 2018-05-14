import { combineReducers } from 'redux';
import tasks from './tasks.js';
import datepicker from './datepicker';

export default combineReducers({
    taskStorage: tasks,
    datePickerStorage: datepicker
});