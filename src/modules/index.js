import { combineReducers } from 'redux';
import tasks from './tasks.js';

export default combineReducers({
    taskStorage: tasks
});