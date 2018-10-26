import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { browserHistory } from './utills/Utill';

import store from './store';
import './style/style.css';

ReactDOM.render(
    <Provider store={store}>
        <Router history = {browserHistory}>
            <App/>
        </Router>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();