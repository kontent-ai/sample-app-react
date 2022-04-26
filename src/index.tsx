import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './LocalizedApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Configuration from './Pages/Admin/Configuration';
import { projectConfigurationPath } from './const';

// TODO define behavior when 404 page.
ReactDOM.render(
    <Router>
      <Routes>
        <Route
          path={projectConfigurationPath}
          element={<Configuration  />}
        />
        <Route path="/:lang/*" element={<App  />} />
        <Route path="/*" element={<App  />} />
      </Routes>
    </Router>,
  document.getElementById('root')
);

