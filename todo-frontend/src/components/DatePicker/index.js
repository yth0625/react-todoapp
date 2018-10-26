import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui';

const Datepicker = ({parameterString, currentDate, onChangeDate}) => {
    let defaultDate;

    const parameterDate = new Date(parameterString);

    if ( isNaN(parameterDate) ) {
        defaultDate = currentDate;
    } 
    else if ( parameterDate.getTime() !== currentDate.getTime() ) {
        defaultDate = new Date(parameterDate);
        onChangeDate(defaultDate);
    }

    return (
        <div>
                selectDate <DatePicker
                id = "date picker"
                defaultDate = {defaultDate}
                onChange = {(event, date) => onChangeDate(date)}
            />
        </div>
    );
}

Datepicker.propTypes = {
    parameterString: PropTypes.string,
    currentDate: PropTypes.instanceOf(Date),
    onChangeDate : PropTypes.func.isRequired
};


export default Datepicker;