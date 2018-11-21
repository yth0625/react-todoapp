import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { getDateToString } from '../../utills/Utill';

const Datepicker = ({parameterString, currentDate, onChangeDate}) => {
    let date = currentDate;
    const parameterDate = new Date(parameterString);
    if ( !isNaN(parameterDate) && parameterDate.getTime() !== currentDate.getTime() ) {
        date = parameterDate;
        onChangeDate(date);
    }

    return (
        <div>
            <TextField
                id="duedate picker"
                label="Select Date"
                type="date"
                helperText={'올바른 날짜를 입력하세요.'}
                defaultValue={getDateToString(date)}
                onChange = {(event) => {
                    const date = new Date(event.target.value);
                    if (!isNaN(new Date(date)))
                        onChangeDate(new Date(date));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <button onClick = {() => onChangeDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}>
                prev
            </button>
            <button onClick = {() => onChangeDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}>
                next
            </button>
        </div>
    );
}

Datepicker.propTypes = {
    parameterString: PropTypes.string,
    currentDate: PropTypes.instanceOf(Date),
    onChangeDate : PropTypes.func.isRequired
};


export default Datepicker;