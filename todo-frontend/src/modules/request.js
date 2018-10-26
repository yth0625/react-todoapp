import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import fetch from 'node-fetch';
import dateformat from 'dateformat';

import * as taskAactions from './tasks';
import * as userActiions from './user';

const serverAddress =  process.env['TODO_SERVER'] || 'http://localhost:5556';

const CREATETASK_PENDING = 'tasks/CREATETASK_PENDING';
const CREATETASK_FULFILLED = 'tasks/CREATETASK_FULFILLED';
const CREATETASK_REJECTED = 'tasks/CREATETASK_REJECTED';

const EDITTASK_PENDING = 'tasks/EDITTASK_PENDING';
const EDITTASK_FULFILLED = 'tasks/EDITTASK_FULFILLED';
const EDITTASK_REJECTED = 'tasks/EDITTASK_REJECTED';

const REMOVETASK_PENDING = 'tasks/REMOVETASK_PENDING';
const REMOVETASK_FULFILLED = 'tasks/REMOVETASK_FULFILLED';
const REMOVETASK_REJECTED = 'tasks/REMOVETASK_REJECTED';

const GETLIST_PENDING = 'tasks/GETLIST_PENDING';
const GETLIST_FULFILLED = 'tasks/GETLIST_FULFILLED';
const GETLIST_REJECTED = 'tasks/GETLIST_REJECTED';

const LOGIN_PENDING = 'user/LOGIN_PENDING';
const LOGIN_FULFILLED = 'user/LOGIN_FULFILLED';
const LOGIN_REJECTED = 'user/LOGIN_REJECTED';

const SIGNUP_PENDING = 'user/SIGNUP_PENDING';
const SIGNUP_FULFILLED = 'user/SIGNUP_FULFILLED';
const SIGNUP_REJECTED = 'user/SIGNUP_REJECTED';

export function createTask(date, userId, listIndex) {
    return async dispatch => {
        dispatch({type: CREATETASK_PENDING});

        const body = JSON.stringify({
            task: {taskdate: dateformat(date, 'isoDate')},
            userid: userId
        });

        let data;
        try {
            data = await doFetchWithResponse(`${serverAddress}/task`, { method: 'POST', body: body});
        } catch (err) {
            dispatch({
                type: CREATETASK_REJECTED,
                payload: err
            });
            return;
        }

        dispatch({
            type: CREATETASK_FULFILLED
        });

        dispatch(taskAactions.create({listIndex: listIndex, ...data}));
    };
} 

export function removeTask(id, listIndex, taskIndex) {
    return async dispatch => {
        dispatch({type: REMOVETASK_PENDING});

        try {
            await doFetchWithResponse(`${serverAddress}/task`, { method: 'DELETE', body: JSON.stringify({id})});
        } catch (err) {
            dispatch({
                type: REMOVETASK_REJECTED,
                payload: err
            })
            return;
        }

        dispatch({
            type: REMOVETASK_FULFILLED
        });
        
        dispatch(taskAactions.remove({listIndex: listIndex, taskIndex: taskIndex}));
    }
}

export function editTask(task, value, action, listIndex, taskIndex) {
    return async dispatch => {
        dispatch({type: EDITTASK_PENDING});

        let reqBody;
        switch (action) {
        case 'tasks/CHECK':
            reqBody = {...task, check: value}
            break;
        case 'tasks/WRITETEXT':
            reqBody = {...task, text: value}
            break;
        case 'tasks/SELECTDUEDATE':
            reqBody = {...task, duedate: value}
            break;
        }
    
        try {
            await doFetchWithResponse(`${serverAddress}/task`, { method: 'PUT', body: JSON.stringify(reqBody)});
        } catch (err) {
            dispatch({
                type: EDITTASK_REJECTED,
                payload: err
            });
        }

        dispatch({
            type: action,
            payload: {listIndex: listIndex, taskIndex: taskIndex, value: value}
        });

        dispatch({
            type: EDITTASK_FULFILLED
        });
    }
}

export function getTaskList(date, id) {
    return async dispatch => {
        dispatch({type: GETLIST_PENDING});
        
        let data;
        try {
            data = await doFetchWithResponse(`${serverAddress}/taskList`, { method: 'POST', body: JSON.stringify({taskdate: dateformat(date, 'isoDate'), userId: id})});
        } catch (err) {
            dispatch({
                type: GETLIST_REJECTED,
                payload: err
            });
            return;
        }

        const taskdate = data.pop();

        if ( data.length == 0 ) 
            dispatch(taskAactions.createlist(taskdate));
        else
            dispatch(taskAactions.addlist({date: taskdate, tasks: data}));

        dispatch({
            type: GETLIST_FULFILLED
        });
    }
}

export function logIn (username, password) {
    return async dispatch => {
        dispatch({type: LOGIN_PENDING});

        let data;
        try {
            data = await doFetchWithResponse(`${serverAddress}/login`, { method: 'POST', body: JSON.stringify({username: username, password: password})});
        } catch (err) {
            dispatch({
                type: LOGIN_REJECTED,
                payload: err
            });
            return;
        }

        document.cookie = `userId=${data.id}; expires=${new Date()}`;

        dispatch({type: LOGIN_FULFILLED});
        dispatch(userActiions.login(data.id));

        return true;
    }
}

export function signUp(username, password) {
    return async dispatch => {
        dispatch({type: SIGNUP_PENDING});

        try {
            await doFetchWithResponse(`${serverAddress}/user`, { method: 'POST', body: JSON.stringify({username: username, password: password})});
        } catch (err) {
            dispatch({
                type: SIGNUP_REJECTED
            });

            throw {err}
        }

        dispatch({SIGNUP_FULFILLED});
        return true;
    }
}


async function doFetchWithResponse (url, options) {
    const response = await fetch(url, {...options, headers: { 'Content-Type': 'application/json' }});
    let data;

    try {
        data = await response.json();
    } catch (err) {
        return  new Error(err);
    }

    if (response.ok)
        return data;

    throw {errors: data.errors[0]};
}

const initalState = Immutable.fromJS({
    requests: {
        createTask : {
            pending: false,
            error: false
        },
        editTask : {
            pending: false,
            error: false
        },
        removeTask: {
            pending: false,
            error: false
        },
        getList: {
            pending: false,
            error: false
        }
    }
});

export default handleActions({
    [CREATETASK_PENDING]: (state) => {
        return state.setIn(['requests', 'createTask'], {pending: true, error: false});
    },

    [CREATETASK_FULFILLED]: (state) => {
        return state.setIn(['requests', 'createTask'], {pending: false, error: false});
    },

    [CREATETASK_REJECTED]: (state) => {
        return state.setIn(['requests', 'createTask'], {pending: false, error: true});
    },

    [EDITTASK_PENDING]: (state) => {
        return state.setIn(['requests', 'editTask'], {pending: true, error: false});
    },

    [EDITTASK_FULFILLED]: (state) => {
        return state.setIn(['requests', 'editTask'], {pending: false, error: false});
    },

    [EDITTASK_REJECTED]: (state) => {
        return state.setIn(['requests', 'editTask'], {pending: false, error: true});
    },

    [REMOVETASK_PENDING]: (state) => {
        return state.setIn(['requests', 'removeTask'], {pending: true, error: false});
    },

    [REMOVETASK_FULFILLED]: (state) => {
        return state.setIn(['requests', 'removeTask'], {pending: false, error: false});
    },

    [REMOVETASK_REJECTED]: (state) => {
        return state.setIn(['requests', 'removeTask'], {pending: false, error: true});
    },

    [GETLIST_PENDING]: (state) => {
        return state.setIn(['requests', 'getList'], {pending: true, error: false});
    },

    [GETLIST_FULFILLED]: (state) => {
        return state.setIn(['requests', 'getList'], {pending: false, error: false});
    },

    [GETLIST_REJECTED]: (state) => {
        return state.setIn(['requests', 'getList'], {pending: false, error: true});
    }
}, initalState);