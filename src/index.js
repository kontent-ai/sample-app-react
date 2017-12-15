import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import './index.css';

ReactDOM.render((
  <Router>
    <Route path="/" render={matchProps => <App {...matchProps} />} />
  </Router>
), document.getElementById("root"));