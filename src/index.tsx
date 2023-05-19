import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './LocalizedApp';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Configuration from './Pages/Admin/Configuration';
import { projectConfigurationPath } from './const';
import languageCodes, { englishCode } from './Utilities/LanguageCodes';
import Cookies from 'universal-cookie';
import { ClientProvider } from './Client';

const cookies = new Cookies(document.cookie);
const cookiesLang = cookies.get('lang');
const lang = languageCodes.includes(cookiesLang) ? cookiesLang : englishCode;

ReactDOM.render(
  <ClientProvider>
    <Router>
      <Routes>
        <Route path={projectConfigurationPath} element={<Configuration />} />

        {languageCodes.map((value) => (
          <Route
            key={value}
            path={`/${value.toLowerCase()}/*`}
            element={<App lang={value} />}
          />
        ))}

        <Route path="/" element={<Navigate to={`/${lang.toLowerCase()}`} />} />
        <Route
          path="*"
          element={<Navigate to={`/${lang.toLowerCase()}/404`} />}
        />
      </Routes>
    </Router>
  </ClientProvider>,
  document.getElementById('root')
);
