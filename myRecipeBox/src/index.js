// REACT
import React from 'react';
import { render } from 'react-dom';
// Components
import Login from './components/Login';
import App from './components/App';
import NotFound from './components/NotFound';
// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// CSS
import './index.css';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact component={Login} />
                <Route path={"/box/:nickname"} exact component={App} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

render(
    <Root />,
    document.getElementById('root')
)