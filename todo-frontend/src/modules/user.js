import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';

const LOGIN = 'user/login';

export const login = createAction(LOGIN); // id, password

const initalState = Immutable.fromJS({
    userId: '2f730e00-8bb1-4739-bca4-8276a89b7eb0'
});

export default handleActions({
    [LOGIN]: (state, action) => {
        return state.set('userId', action.payload);
    }
}, initalState);