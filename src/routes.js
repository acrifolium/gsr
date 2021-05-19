import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/home/home';
import Layout from './layout/layout';

const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
        <Switch>
            <Layout exact path="/" component={Home} />              
        </Switch>
    </Router>
  );
};

export default Routes;
