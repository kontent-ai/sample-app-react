import React, { Component } from 'react';
import App from './App'
import _ from 'lodash'
import { TranslatorProvider } from "react-translate"

import { languageCodes } from './Utilities/LanguageCodes'
import { localizationObject } from './Utilities/LocalizationLoader'


class LocalizedApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: this.getLanguageCode(props.match)
        }
        this.setLanguageCode = this.setLanguageCode.bind(this);
    }

    getLanguageCode(match) {
        let languageCode = languageCodes[0];
        if (!_.has(match, ['params', 'lang'])) {
            return languageCode;
        }

        let languageParameter = _.get(match, ['params', 'lang']);
        if (languageCodes.indexOf(languageParameter) > -1) {
            return languageParameter;
        }
        return languageCode;
    }

    setLanguageCode(newLanguage) {
        if (this.state.language === newLanguage || languageCodes.indexOf(newLanguage) < 0) {
            return;
        }

        let urlParts = this.props.location.pathname.split('/');
        let currentLanguage = this.props.location.pathname.split('/')[1];
        if (languageCodes.indexOf(currentLanguage) > -1) {
            urlParts[1] = newLanguage;
        } else {
            urlParts.splice(1, 0, newLanguage)
        }

        this.setState({
            language: newLanguage
        });
        this.props.history.push(urlParts.join('/'))
    }

    render() {
        return (
            <div>
                <TranslatorProvider translations={localizationObject[this.state.language]}>
                    <App {...this.props} language={this.state.language} changeLanguage={this.setLanguageCode} />
                </TranslatorProvider>
            </div>
        );
    }
}

export default LocalizedApp;