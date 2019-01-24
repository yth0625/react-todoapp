import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';

const LOGIN = 'user/login';
const LOGOUT = 'user/logout';

export const logIn = createAction(LOGIN); // userId
export const logOut = createAction(LOGOUT);

const initalState = Immutable.fromJS({
    userId: ''
});

export default handleActions({
    [LOGIN]: (state, action) => {
        return state.set('userId', action.payload);
    },
    
    [LOGOUT]: (state) => {
        return state.set('userId', '');
    }
}, initalState);