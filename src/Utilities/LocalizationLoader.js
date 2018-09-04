const initLocalizationObject = () => {
  let localizations = require.context('../Localization', false, /\.json$/);

  let localizationObject = {};
  localizations.keys().forEach(item => {
    let localizationKey = item.replace(/\.\/(\w+-\w+)\.json$/, '$1');
    var localization = require(`../Localization/${localizationKey}`);

    localizationObject[localizationKey] = localization;
  });
  return localizationObject;
};

const localizationObject = initLocalizationObject();

module.exports = {
  localizationObject
};
