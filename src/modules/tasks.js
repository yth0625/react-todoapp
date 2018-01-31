import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';

const CREATE = 'tasks/CREATE';
const REMOVE = 'tasks/REMOVE';

export const create = createAction(CREATE); // date, task(text, duedate)
export const remove = createAction(REMOVE); // date, task(index)

const initialState = Map({
    tasksList: List([
        Map({
            tasks: List([
                Map({
                    date: '20180129'
                }),
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
            tasks: List([
                Map({
                    date: '20180130'
                }),
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


export default handleActions({
}, initialState);