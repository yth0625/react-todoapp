import LoginForm from '../components/LoginForm';
import * as requestActions from '../modules/request'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    userId: state.userStorage.get('userId'),
    logInRequest: state.requestsStorage.getIn(['requests', 'logIn']).toJS()
});

const mapDispatchProps = (dispatch) => ({
    logIn: (username, password) => dispatch(requestActions.logIn(username, password))
});

const LoginFormContainer = connect(mapStateToProps,
    mapDispatchProps
)(LoginForm);

export default LoginFormContainer;