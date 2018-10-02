import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './LocalizedApp';
import Configuration from './Pages/Admin/Configuration';
import { CookiesProvider } from 'react-cookie';
import { projectConfigurationPath } from './Utilities/SelectedProject';

import './index.css';

const application = (
  <CookiesProvider>
    <Router>
      <Switch>
        <Route
          path={projectConfigurationPath}
          render={matchProps => <Configuration {...matchProps} />}
        />
        <Route path="/:lang" render={matchProps => <App {...matchProps} />} />
        <Route path="/" render={matchProps => <App {...matchProps} />} />
      </Switch>
    </Router>
  </CookiesProvider>
);

ReactDOM.render(application, document.getElementById('root'));
