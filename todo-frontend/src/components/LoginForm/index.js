import React from 'react';
import PropTypes from 'prop-types';

import { getCookie, browserHistory } from '../../utills/Utill';

export default class LoginForm extends React.Component {
    static propTypes = {
        userId: PropTypes.string,
        logInRequest: PropTypes.instanceOf(Object).isRequired,
        logIn: PropTypes.func.isRequired
    };

    constructor(props) { 
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);

        if (getCookie('userId')) {
            browserHistory.push('/todo');
        }
    }
     
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.logInRequest.status === 'fulfilled' && this.props.logInRequest.status === 'started'){
            browserHistory.push('/');
        }

        if (nextProps.logInRequest.rejected === 'rejected' || nextProps.logInRequest.error === 'Not Match' ) {
            nextState.errorMessage  = '입력된 계정과 일치하는 사용자 정보를 찾을 수 없습니다.';
        }

        if (nextProps.logInRequest.rejected === 'rejected' || nextProps.logInRequest.error === 'connection error' ) {
            nextState.errorMessage  = '서버와 연결이 종료 되었습니다. 연결을 확인해주세요.';
        }

        return true;
    } 

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.username) {
            this.setState({
                errorMessage: '유저 네임을 입력하세요.'
            });
            return;
        } 

        if (!this.state.password) {
            this.setState({
                errorMessage: '비밀번호를 입력하세요.'
            });
            return;
        } 

        this.props.logIn(this.state.username, this.state.password);
    }

    onClickSignUp() {
        browserHistory.push('/signup');
    }

    render () {
        let errorMessage = null;

        if (this.state.errorMessage)
            errorMessage = <div className='errorBox'>{this.state.errorMessage}</div>

        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                {errorMessage}
                Username: <input 
                    type="text"
                    name="username"
                    placehorder="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                /><br/>

                Password: <input
                    name="password"
                    type="password"
                    placehorder="PASSWORD"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br/>
                <button type='submit'>Login</button>
                <button type='button' onClick={this.onClickSignUp}>Sign Up</button>
            </form>
        )
    }
}