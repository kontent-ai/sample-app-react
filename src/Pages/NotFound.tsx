import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { localizationObject } from '../Utilities/LocalizationLoader';
import { englishCode, languageCodes } from '../Utilities/LanguageCodes';
import { SetLanguageType } from '../LocalizedApp';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export const NotFound: React.FC = () => {
  const cookies = new Cookies(document.cookie);
  const lang = cookies.get('lang');
  const [language, setLanguage] = useState(lang ?? englishCode);

  const setLanguageCode: SetLanguageType = (newLanguage) => {
    if (
      language === newLanguage ||
      languageCodes.indexOf(newLanguage) < 0
    ) {
      return;
    }

    setLanguage(newLanguage);
  };

  return (
    <IntlProvider locale={language} messages={localizationObject[language]}>
      <div className='application-content'>
        <Header changeLanguage={setLanguageCode} />
        <div className={'container'}>
          <div style={{ textAlign: 'center' }}>
            <h1>404</h1>
            <h2><FormattedMessage id={'NotFound.message'} /></h2>
          </div>
        </div>
        <Footer />
      </div>
    </IntlProvider>
  );
};
