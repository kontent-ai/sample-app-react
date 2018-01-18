import _ from 'lodash'

const languageCodes = [
    'en-US', // default languages
    'es-ES'
];

const languageCodesLowerCase = languageCodes.map(code => code.toLowerCase());

const dateFormats = {
    'en-US': {
        dayNames: [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        monthNames: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        timeNames: [
            'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
        ]
    },
    'es-ES': {
        dayNames: [
            "dom.", "lun.", "mar.", "mi\u00e9.", "jue.", "vie.", "s\u00e1b.",
            "domingo", "lunes", "martes", "mi\u00e9rcoles", "jueves", "viernes", "s\u00e1bado"
        ],
        monthNames: [
            "ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic.",
            "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ],
        timeNames: [
            "a. m.", "p. m.", "a. m.", "p. m.", "a. m.", "p. m.", "a. m.", "p. m."
        ]
    }
}

const defaultLanguage = languageCodes[0];

const initLanguageCodeObject = (object) => {
    if (!object) {
        object = {};
    }

    languageCodes.forEach(language => {
        object[language] = [];
    })

    return object
}

const getLanguageCode = (match) => {
    const languageCode = languageCodes[0];
    if (!_.has(match, ['params', 'lang'])) {
        return languageCode;
    }

    const languageParameter = _.get(match, ['params', 'lang']);
    if (languageCodesLowerCase.indexOf(languageParameter.toLowerCase()) > -1) {
        return languageCodes[languageCodesLowerCase.indexOf(languageParameter.toLowerCase())];
    }
    return defaultLanguage;
}

module.exports = {
    languageCodes,
    languageCodesLowerCase,
    dateFormats,
    defaultLanguage,
    initLanguageCodeObject,
    getLanguageCode
};
export default languageCodes;