import { combineReducers } from 'redux';
import tasks from './tasks';
import datepicker from './datepicker';
import requests from './request';

export default combineReducers({
    taskStorage: tasks,
    datePickerStorage: datepicker,
    requestsStorage: requests
});