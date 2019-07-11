import React from 'react';
import PropTypes from 'prop-types';

import {deleteCookie} from '../../utills/Utill';
import { Button } from '@material-ui/core';

const UserSetting = ({logOut}) => {
    const clickLogOut = () => {
        logOut();
        deleteCookie('userId');
    }

    return (
        <div className='UserSetting'>
            <Button variant="contained" onClick={clickLogOut}>Log Out</Button>
        </div>
    )
}

UserSetting.propTypes = {
    logOut: PropTypes.func.isRequired
};

export default UserSetting;