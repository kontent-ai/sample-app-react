import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TranslatorProvider } from 'react-translate';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
  getLanguageCode
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';

class LocalizedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: getLanguageCode(props.match)
    };
    this.setLanguageCode = this.setLanguageCode.bind(this);
  }

  setLanguageCode(newLanguage, newUrl) {
    if (
      this.state.language === newLanguage ||
      languageCodes.indexOf(newLanguage) < 0
    ) {
      return;
    }

    const urlParts = this.props.location.pathname.split('/');
    const currentLanguage = this.props.location.pathname.split('/')[1];
    if (languageCodesLowerCase.indexOf(currentLanguage) > -1) {
      urlParts[1] = newLanguage;
    } else {
      urlParts.splice(1, 0, newLanguage);
    }

    this.setState({
      language: newLanguage
    });
    if (newUrl) {
      this.props.history.push(urlParts.splice(0, 2).join('/') + newUrl);
    } else {
      this.props.history.push(urlParts.join('/'));
    }
  }

  render() {
    if (
      this.props.location.pathname !==
      this.props.location.pathname.toLowerCase()
    ) {
      return <Redirect to={this.props.location.pathname.toLowerCase()} />;
    }
    return (
      <div>
        <TranslatorProvider
          translations={localizationObject[this.state.language]}
        >
          <App
            {...this.props}
            language={this.state.language}
            changeLanguage={this.setLanguageCode}
          />
        </TranslatorProvider>
      </div>
    );
  }
}

export default LocalizedApp;
