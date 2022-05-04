import React, { useEffect, useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';
import { IntlProvider } from 'react-intl';
import Cookies from 'universal-cookie';

export type SetLanguageType = (newLanguage: string, newUrl?: string) => void;

interface LocalizedAppProps {
  lang: string;
}

const LocalizedApp: React.FC<LocalizedAppProps> = ({ lang }) => {
  const cookies = useMemo(() => new Cookies(document.cookie), []);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    cookies.set('lang', lang, { path: '/' });
  }, [lang, cookies]);

  const setLanguageCode: SetLanguageType = (newLanguage, newUrl) => {
    if (lang === newLanguage || languageCodes.indexOf(newLanguage) < 0) {
      return;
    }

    const urlParts = pathname.split('/');
    const currentLanguage = pathname.split('/')[1];
    if (languageCodesLowerCase.indexOf(currentLanguage) > -1) {
      urlParts[1] = newLanguage;
    } else {
      urlParts.splice(1, 0, newLanguage);
    }

    if (newUrl) {
      navigate(urlParts.splice(0, 2).join('/').toLowerCase() + newUrl);
    } else {
      navigate(urlParts.join('/').toLowerCase());
    }
  };

  if (pathname !== pathname.toLowerCase()) {
    return <Navigate to={pathname.toLowerCase()} replace />;
  }

  return (
    <div>
      <IntlProvider locale={lang} messages={localizationObject[lang]}>
        <App changeLanguage={setLanguageCode} />
      </IntlProvider>
    </div>
  );
};

export default LocalizedApp;
