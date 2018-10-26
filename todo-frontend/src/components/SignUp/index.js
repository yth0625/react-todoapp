import React from 'react';
import PropTypes from 'prop-types';

import { browserHistory } from '../../utills/Utill';

export default class SignUp extends React.PureComponent {
    static propTypes = {
        signUp: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            signUpError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorCheck = this.errorCheck.bind(this);
    }

    errorCheck() {
        if (!this.state.username) {
            this.setState({
                usernameError: '필요 한 항목입니다. 값을 입력 해 주세요.',
                passwordError: ''
            });
            return false;
        }
        
        if (!this.state.password) {
            this.setState({
                usernameError: '',
                passwordError: '필요 한 항목입니다. 값을 입력 해 주세요.'
            });

            return false;
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

        if (this.errorCheck()) {
            this.setState({
                usernameError: '',
                passwordError: ''
            });
        } else return;

        this.props.signUp(this.state.username, this.state.password).
            then( result => {
                console.log(result);
                if (result)
                    browserHistory.push('/');
            }).catch( err => {
                console.log(err);
            })
    }

    render() {
        let nameErrorMessage = null;
        let passwordErrorMessage = null;

        if (this.state.usernameError)
            nameErrorMessage = <div className='errorBox'>{this.state.usernameError}</div>

        if (this.state.passwordError)
            passwordErrorMessage = <div className='errorBox'>{this.state.passwordError}</div>

        return (
            <form className='signup-form' onSubmit={this.handleSubmit}>
                <h4>사용자명을 입력하세요.</h4>
                <input 
                    type="text"
                    name="username"
                    placehorder="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                /> 
                {nameErrorMessage}
                

                <h4>비밀번호를 입력하세요.</h4>
                <input
                    name="password"
                    type="password"
                    placehorder="PASSWORD"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br/>
                {passwordErrorMessage}

                <button type='submit'>SignUp</button>
            </form>
        );
    }
}