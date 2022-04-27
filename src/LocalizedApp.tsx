import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
  englishCode
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';
import { IntlProvider } from 'react-intl';

const LocalizedApp: React.FC = () => {
  const [language, setLanguage] = useState(englishCode);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setLanguageCode = (newLanguage: string, newUrl: string): void => {
    if (
      language === newLanguage ||
      languageCodes.indexOf(newLanguage) < 0
    ) {
      return;
    }

    const urlParts = pathname.split('/');
    const currentLanguage = pathname.split('/')[1];
    if (languageCodesLowerCase.indexOf(currentLanguage) > -1) {
      urlParts[1] = newLanguage;
    } else {
      urlParts.splice(1, 0, newLanguage);
    }

    setLanguage(newLanguage);
    if (newUrl) {
      navigate(urlParts.splice(0, 2).join('/') + newUrl);
    } else {
      navigate(urlParts.join('/'));
    }
  };

  if (pathname !== pathname.toLowerCase()) {
    return <Navigate to={pathname.toLowerCase()} />;
  }

  return (
    <div>
      <IntlProvider
        locale={language}
        messages={localizationObject[language]}
      >
        <App
          changeLanguage={setLanguageCode} />
      </IntlProvider>
    </div>
  );
};

export default LocalizedApp;
