import React from 'react';
import PropTypes from 'prop-types';

import {deleteCookie} from '../../utills/Utill';

const UserSetting = ({logOut}) => {
    const clickLogOut = () => {
        logOut();
        deleteCookie('userId');
    }

    return (
        <button type='button' onClick={clickLogOut}>Log Out</button>
    )
}

UserSetting.propTypes = {
    logOut: PropTypes.func.isRequired
};

export default UserSetting;