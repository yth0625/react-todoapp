import { combineReducers } from 'redux';
import tasks from './tasks';
import datepicker from './datepicker';
import requests from './request';
import user from './user';

export default combineReducers({
    taskStorage: tasks,
    datePickerStorage: datepicker,
    requestsStorage: requests,
    userStorage: user
});