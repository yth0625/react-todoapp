import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';

const LOGIN = 'user/login';

export const logIn = createAction(LOGIN); // id, password

const initalState = Immutable.fromJS({
    userId: ''
});

export default handleActions({
    [LOGIN]: (state, action) => {
        return state.set('userId', action.payload);
    }
}, initalState);