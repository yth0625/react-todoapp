import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';

const CREATE = 'tasks/CREATE';
const REMOVE = 'tasks/REMOVE';
const CHECK = 'tasks/CHECK';
const WRITETEXT = 'tasks/WRITETEXT'; 

export const create = createAction(CREATE); // date, task(text, duedate)
export const remove = createAction(REMOVE); // date, task(index)
export const oncheck = createAction(CHECK); // index
export const writetext = createAction(WRITETEXT);

const initialState = Map({
    tasksList: List([
        Map({
            date: '20180129',
            tasks: List([
                Map({
                    check: false,
                    text: 'test',
                    duedate: '20180130'
                }),
                Map({
                    check: false,
                    text: 'test2',
                    duedate: '20180131'
                })
            ])
        }),
        Map({
            date: '20180130',
            tasks: List([
                Map({
                    check: false,
                    text: 'test',
                    duedate: '20180131'
                })
            ])
        })
    ]),
    selectDate: '20180129'
});

function setTask(state, action, changefn) { 
    //state = state.setIn(['tasksList', action.payload.listIndex, 'tasks', action.payload.taskIndex, 'check'], true);
    state = state.set('tasksList', state.get('tasksList').update(
        action.payload.listIndex,
        (tasksList) => {
            const tasks = tasksList.get('tasks');
            return tasksList.set('tasks', tasks.update(
                action.payload.taskIndex,
                changefn
            ));
        }
    ));
    return state;
}

export default handleActions({
    [CREATE]: (state, action) => {
        state = state.set('tasksList', state.get('tasksList').update(
            action.payload,
            (tasksList) => tasksList.set('tasks', tasksList.get('tasks').push(
                Map({
                    check: false,
                    text: '',
                    duedate: ''
                })
            ))
        ));
        return state;
    },

    [REMOVE]: (state, action) => {
        state = state.set('tasksList', state.get('tasksList').update(
            action.payload.listIndex,
            (tasksList) => tasksList.set('tasks', tasksList.get('tasks').delete(action.payload.taskIndex))
        ));
        return state;
    },

    [CHECK]: (state, action) => {
        const changefn = (task) => {
            return task.set('check', !task.get('check'));
        }
        state = setTask(state, action, changefn);
        return state;
    },

    [WRITETEXT]: (state, action) => {
        const changefn = (task) => {
            return task.set('text', action.payload.e.target.value);
        }
        state = setTask(state, action, changefn);

        console.log(action.payload.e);

        return state;
    }
}, initialState);