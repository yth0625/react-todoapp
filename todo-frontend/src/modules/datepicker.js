import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';

const SELECTDATE = 'datepicker/SELCETDATE';

export const selectdate = createAction(SELECTDATE);

const date = new Date();
const initialState = Map({
    selectDate: new Date(date.getFullYear(), date.getMonth(), date.getDate())
});

export default  handleActions({
    [SELECTDATE]: (state, action) => {
        state = state.set('selectDate', action.payload);
        return state;
    }
}, initialState);