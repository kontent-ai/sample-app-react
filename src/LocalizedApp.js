import React, { Component } from 'react';
import App from './App'
import _ from 'lodash'

const languageCodes = [
    'en-US',
    'es-ES'
]

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
            return
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
                <App {...this.props} language={this.state.language} changeLanguage={this.setLanguageCode} />
            </div>
        );
    }
}

export default LocalizedApp;