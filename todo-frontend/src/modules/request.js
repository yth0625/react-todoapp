import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import fetch from 'node-fetch';
import dateformat from 'dateformat';

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

export const createTask = (date, listIndex) => dispatch => {
    dispatch({type: CREATETASK_PENDING});

    return createTaskAPI(date).then( response => {
        dispatch({
            type: CREATETASK_FULFILLED
        });

        dispatch({
            type: 'tasks/CREATE',
            payload: {listIndex: listIndex, ...response}
        });
    }).catch( error => {
        dispatch({
            type: CREATETASK_REJECTED,
            paylaod: error
        });
    })
};

export const removeTask = (id, listIndex, taskIndex) => dispatch => {
    dispatch({type: REMOVETASK_PENDING});

    return removeTaskAPI(id).then( () => {
        dispatch({
            type: REMOVETASK_FULFILLED
        });
        
        dispatch({
            type: 'tasks/REMOVE',
            payload: {listIndex: listIndex, taskIndex: taskIndex}
        });
    }).catch( error => {
        dispatch({
            type: REMOVETASK_REJECTED,
            paylaod: error
        });
    });
}

export const editTask = (task, value, action, listIndex, taskIndex) => dispatch => {
    dispatch({type: EDITTASK_PENDING});

    let data;
    switch (action) {
    case 'tasks/CHECK':
        data = {...task, check: value}
        break;
    case 'tasks/WRITETEXT':
        data = {...task, text: value}
        break;
    case 'tasks/SELECTDUEDATE':
        data = {...task, duedate: value}
        break;
    }

    return editTaskAPI(data).then( response => {
        if ( response ) {
            dispatch({
                type: action,
                payload: {listIndex: listIndex, taskIndex: taskIndex, value: value}
            });

            dispatch({
                type: EDITTASK_FULFILLED
            });
        } else 
            dispatch({
                type: EDITTASK_REJECTED,
                payload: 'fail...'
            });
    }).catch( error  => {
        dispatch({
            type: EDITTASK_REJECTED,
            payload: error
        });
    });
}

export const getTaskList = (date) => dispatch => {
    dispatch({type: GETLIST_PENDING});

    return getTaskListAPI(date).then( response => {
        const date = response.pop();

        if ( response.length == 0 ) {
            dispatch({
                type: 'tasks/CREATELIST',
                payload: date
            });

        } else {
            dispatch({
                type: 'tasks/ADDLIST',
                payload: {date: date, tasks: response}
            });
        }

        dispatch({
            type: GETLIST_FULFILLED
        });
        
    }).catch( error => {
        dispatch({
            type: GETLIST_REJECTED,
            payload: error
        });
    });
}

function createTaskAPI(date) {
    return fetch(`${serverAddress}/task`, { method: 'POST', body: JSON.stringify({taskdate: dateformat(date, 'isoDate')}), headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json());
}

function getTaskListAPI(date) {
    return fetch(`${serverAddress}/taskList`, { method: 'POST', body: JSON.stringify({taskdate: dateformat(date, 'isoDate')}), headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json());
}

function editTaskAPI(task) {
    return fetch(`${serverAddress}/task`, { method: 'PUT', body: JSON.stringify(task), headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json());
}

function removeTaskAPI(id) {
    return fetch(`${serverAddress}/task`, { method: 'DELETE', body: JSON.stringify({id}), headers: { 'Content-Type': 'application/json' }});
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