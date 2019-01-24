import React from 'react';
import PropTypes from 'prop-types';

import {deleteCookie} from '../../utills/Utill';

const UserSetting = ({logOut}) => {
    const clickLogOut = () => {
        logOut();
        deleteCookie('userId');
    }

    return (
        <div className='UserSetting'>
            <button type='button' onClick={clickLogOut}>Log Out</button>
        </div>
    )
}

UserSetting.propTypes = {
    logOut: PropTypes.func.isRequired
};

export default UserSetting;