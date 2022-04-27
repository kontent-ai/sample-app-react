type localizationObjectType = {
  [key: string]: {
    [key: string]: string
  }
}

const initLocalizationObject = (): localizationObjectType => {
  const localizations = require.context('../Localization', false, /\.json$/);

  const localizationObject:{[index: string]: any} = {};
  localizations.keys().forEach((item: string) => {
    let localizationKey = item.replace(/\.\/(\w+-\w+)\.json$/, '$1');
    const localization = require(`../Localization/${localizationKey}`);

    localizationObject[localizationKey] = localization;
  });
  return localizationObject;
};

export const localizationObject = initLocalizationObject();
