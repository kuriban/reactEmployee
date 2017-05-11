import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NewEmployeeBlock from './components/newEmployee';

import {Router, Route, IndexRoute, browserHistory } from 'react-router';


import Main from './components/main';

const App = () => (
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>
);

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/newemployee" component={NewEmployeeBlock} />
    </Router>,
    document.getElementById('app')
);
