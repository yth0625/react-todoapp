import UserSetting from '../components/UserSetting';
import * as userActions from '../modules/user';
import { connect } from 'react-redux';

const mapDispatchProps = (dispatch) => ({
    logOut: () => dispatch(userActions.logOut())
});

const UserSettingContainer = connect(
    null, mapDispatchProps
)(UserSetting);

export default UserSettingContainer;