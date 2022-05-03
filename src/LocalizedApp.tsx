import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
  englishCode
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';
import { IntlProvider } from 'react-intl';
import Cookies from 'universal-cookie';

export type SetLanguageType = (newLanguage: string, newUrl?: string) => void;

interface LocalizedAppProps {
  lang?: string
}

const LocalizedApp: React.FC<LocalizedAppProps> = ({lang}) => {
  const cookies = useMemo(() => new Cookies(document.cookie), []);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getLanguageIndex = (l: string): number => {
    return languageCodes.map((val) => val.toLowerCase()).indexOf((l).toLowerCase())
  }

  const setLanguageState = (): string => {
    let newLang = englishCode;

    const cookiesLangIndex = getLanguageIndex(cookies.get("lang") ?? "");
    if(cookiesLangIndex >= 0){
      newLang = languageCodes[cookiesLangIndex];
    }

    const urlLanguageIndex = getLanguageIndex(lang ?? "");
    if(urlLanguageIndex >= 0){
      newLang = languageCodes[urlLanguageIndex];
    }

    return newLang;
  }

  const [ language, setLanguage ] = useState(setLanguageState());

  useEffect(() => {
    cookies.set("lang", language, { path:"/" })
  }, [language, cookies])

  const setLanguageCode: SetLanguageType = (newLanguage, newUrl) => {
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
