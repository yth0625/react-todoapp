import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui';

const Datepicker = ({selectDate, onChangeDate}) => {
    return (
        <div>
            selectDate <DatePicker
                id = "date picker"
                defaultDate = {selectDate}
                onChange = {(event, date) => onChangeDate(date)}
            />
        </div>
    );
}

Datepicker.propTypes = {
    selectDate: PropTypes.instanceOf(Date),
    onChangeDate : PropTypes.func.isRequired
};


export default Datepicker;