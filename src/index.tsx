import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './LocalizedApp';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Configuration from './Pages/Admin/Configuration';
import { projectConfigurationPath } from './const';

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <Routes>
        <Route
          path={projectConfigurationPath}
          element={<Configuration  />}
        />
        <Route path="/:lang/*" element={<App  />} />
        <Route path="/" element={<App  />} />
      </Routes>
    </Router>
  </CookiesProvider>,
  document.getElementById('root')
);

