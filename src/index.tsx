import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './LocalizedApp';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Configuration from './Pages/Admin/Configuration';
import { projectConfigurationPath } from './const';
import { NotFound } from './Pages/NotFound';
import languageCodes from './Utilities/LanguageCodes';

ReactDOM.render(
    <Router>
      <Routes>
        <Route
          path={projectConfigurationPath}
          element={<Configuration  />}
        />

        {languageCodes.map((value) => (
          <Route key={value} path={`/${value.toLowerCase()}/*`} element={<App lang={value}/>} />
        ))}

        <Route path="/" element={<App />} />
        <Route path="/404" element={<NotFound /> } />
        <Route path="*" element={<Navigate to={"/404"} /> } />
      </Routes>
    </Router>,
  document.getElementById('root')
);

