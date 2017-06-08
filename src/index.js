import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';

// import NewEmployeeBlock from './components/newEmployee';

// import {Router, Route, browserHistory } from 'react-router';

import Main from './components/main';

import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>
);

render(
    <Provider store={ store }>
        <App />
    </Provider>
    ,
    document.getElementById('app')
);