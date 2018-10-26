import SignUp from '../components/SignUp';
import * as requestActions from '../modules/request';
import { connect } from 'react-redux';

const mapDispatchProps = (dispatch) => ({
    signUp: (username, password) => dispatch(requestActions.signUp(username, password))
});

const SignUpContainer = connect(null,
    mapDispatchProps)(SignUp);

export default SignUpContainer;