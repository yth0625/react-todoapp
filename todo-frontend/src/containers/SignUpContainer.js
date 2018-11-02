import SignUp from '../components/SignUp';
import * as requestActions from '../modules/request';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    signUpRequest: state.requestsStorage.getIn(['requests', 'signUp']).toJS()
});

const mapDispatchProps = (dispatch) => ({
    signUp: (username, password) => dispatch(requestActions.signUp(username, password))
});

const SignUpContainer = connect(mapStateToProps,
    mapDispatchProps)(SignUp);

export default SignUpContainer;