import { handleActions, createAction } from 'redux-actions';
import Immutable, { Map, List } from 'immutable';

const CREATE = 'tasks/CREATE';
const REMOVE = 'tasks/REMOVE';
const CHECK = 'tasks/CHECK';
const WRITETEXT = 'tasks/WRITETEXT';
const SELECTDUEDATE = 'tasks/SELECTDUEDATE';
const CREATELIST = 'tasks/CREATELIST';
const ADDLIST = 'tasks/ADDLIST';

export const create = createAction(CREATE); // listIndex, id
export const remove = createAction(REMOVE); // listIndex, taskIndex
export const oncheck = createAction(CHECK); // listIndex, taskIndex, check 
export const writetext = createAction(WRITETEXT); // listIndex, taskIndex, text
export const selectduedate = createAction(SELECTDUEDATE); // listIndex, taskIndex, duedat
export const createlist = createAction(CREATELIST); // date
export const addlist = createAction(ADDLIST); // tasks

function setTask(state, action, changefn) {
    const newState = state.set('tasksList', state.get('tasksList').update(
        action.payload.listIndex,
        (tasksList) => {
            const tasks = tasksList.get('tasks');
            return tasksList.set('tasks', tasks.update(
                action.payload.taskIndex,
                changefn
            ));
        }
    ));
    return newState;
}

const initialState = Immutable.fromJS({
    tasksList: []
});

export default handleActions({
    [CREATE]: (state, action) => {
        return state.set('tasksList', state.get('tasksList').update(
            action.payload.listIndex,
            (tasksList) => tasksList.set('tasks', tasksList.get('tasks').push(
                Map({
                    id: action.payload.id,
                    check: action.payload.check,
                    text: action.payload.text,
                    duedate: new Date(action.payload.duedate)
                })
            ))
        ));
    },

    [REMOVE]: (state, action) => {
        return state.set('tasksList', state.get('tasksList').update(
            action.payload.listIndex,
            (tasksList) => tasksList.set('tasks', tasksList.get('tasks').delete(action.payload.taskIndex))
        ));
    },

    [CHECK]: (state, action) => {
        const changefn = (task) => {
            return task.set('check', action.payload.value);
        }

        return setTask(state, action, changefn);
    },

    [WRITETEXT]: (state, action) => {
        const changefn = (task) => {
            return task.set('text', action.payload.value);
        }

        return setTask(state, action, changefn);
    },

    [SELECTDUEDATE]: (state, action) => {
        const changefn = (task) => {
            return task.set('duedate', action.payload.value)
        }

        return setTask(state, action, changefn);
    },

    [CREATELIST]: (state, action) => {
        return state.set('tasksList', state.get('tasksList').push(
            Map({
                date: new Date(action.payload),
                tasks: List([
                ])
            })
        ));
    },

    [ADDLIST]: (state, action) => {
        const tasks = action.payload.tasks.map( tasks  => {
            return Map({id: tasks.id ,'check': tasks.check, text: tasks.text, duedate: new Date(tasks.duedate)})
        });
        
        return state.set('tasksList', state.get('tasksList').push(
            Map({
                date: new Date(action.payload.date),
                tasks: List(tasks)
            })
        ));
    }
}, initialState);