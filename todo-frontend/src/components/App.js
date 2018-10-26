import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import TaskListContainer from '../containers/TaskListContainer';
import DataPickerContainer from '../containers/DatePickerContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import SignUpContainer from '../containers/SignUpContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getCookie, browserHistory } from '../utills/Utill';

const Todo = ({ match }) => (
    <div>
        <MuiThemeProvider>
            <DataPickerContainer
                parameterString = {match.params.date}
            />
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TaskListContainer/>
        </MuiThemeProvider>
    </div>
);

Todo.propTypes = {
    match: PropTypes.object
};

const Login = () => {
    return (
        <div>
            <MuiThemeProvider>
                <LoginFormContainer/>
            </MuiThemeProvider>
        </div>
    )
}

const SignUp = () => {
    return (
        <div>
            <SignUpContainer/>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <Route history={browserHistory}>
                <Switch>
                    <Route path="/todo/:date" component={Todo}/>

                    <Route path ="/todo" component={Todo}/>

                    <Route path="/login" component={Login}/>

                    <Route path="/signup" component={SignUp}/>
    
                    <Route path="/" render={() => (
                        getCookie('userId') ? <Redirect to="/todo"/>
                            : <Redirect to="/login"/>)}/>
                </Switch>
            </Route>
        </div>
    );
}; 

export default App;