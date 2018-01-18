import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './LocalizedApp';

import './index.css';

ReactDOM.render((
  <Router>
    <Switch>
      <Route path="/:lang" render={matchProps => <App {...matchProps} />} />
      <Route path="/" render={matchProps => <App {...matchProps} />} />
    </Switch>
  </Router>
), document.getElementById("root"));