import React from 'react';
import PropTypes from 'prop-types';

import { getCookie, browserHistory } from '../../utills/Utill';

export default class LoginForm extends React.PureComponent {
    static propTypes = {
        userId: PropTypes.string,
        logIn: PropTypes.func.isRequired,
        history: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);

        if (getCookie('userId')) {
            browserHistory.push('/todo');
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.logIn(this.state.username, this.state.password).
            then( result => {
                if (result)
                    browserHistory.push('/todo');
            });
    }

    onClickSignUp() {
        browserHistory.push('/signup');
    }

    render () {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
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