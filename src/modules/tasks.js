import { handleActions, createAction } from 'redux-actions';
import Immutable, { Map, List } from 'immutable';

const CREATE = 'tasks/CREATE';
const REMOVE = 'tasks/REMOVE';
const CHECK = 'tasks/CHECK';
const WRITETEXT = 'tasks/WRITETEXT';
const SELECTDUEDATE = 'tasks/SELECTDUEDATE';
const CREATELIST = 'tasks/CREATELIST';

export const create = createAction(CREATE); // listIndex, taskIndex
export const remove = createAction(REMOVE); // listIndex, taskIndex
export const oncheck = createAction(CHECK); // listIndex, taskIndex, check 
export const writetext = createAction(WRITETEXT); // listIndex, taskIndex, text
export const selectduedate = createAction(SELECTDUEDATE); // listIndex, taskIndex, duedate
export const createlist = createAction(CREATELIST); // listIndex, date

const initialState = Immutable.fromJS({
    tasksList: [
        {
            date: new Date(2018, 0, 29),
            tasks: [
                {
                    check: false,
                    text: 'test',
                    duedate: new Date()
                },
                {
                    check: false,
                    text: 'test2',
                    duedate: new Date()
                }
            ],
        },
        {
            date: new Date(2018, 0, 30),
            tasks: [
                {
                    check: false,
                    text: 'test',
                    duedate: new Date()
                }
            ]
        }
    ]
});

function setTask(state, action, changefn) {
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
        return state.set('tasksList', state.get('tasksList').update(
            action.payload,
            (tasksList) => tasksList.set('tasks', tasksList.get('tasks').push(
                Map({
                    check: false,
                    text: '',
                    duedate: new Date()
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
            return task.set('check', !task.get('check'));
        }

        return setTask(state, action, changefn);
    },

    [WRITETEXT]: (state, action) => {
        const changefn = (task) => {
            return task.set('text', action.payload.text);
        }

        return setTask(state, action, changefn);
    },

    [SELECTDUEDATE]: (state, action) => {
        const changefn = (task) => {
            return task.set('duedate', action.payload.duedate)
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
        )
        );
        // TODO tasksList를 date 기준으로 sort 하기
    }
}, initialState);