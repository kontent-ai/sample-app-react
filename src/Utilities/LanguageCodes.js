const languageCodes = [
    'en-US', // default languages
    'es-ES'
];

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

module.exports = {
    languageCodes,
    defaultLanguage,
    initLanguageCodeObject
};
export default languageCodes;