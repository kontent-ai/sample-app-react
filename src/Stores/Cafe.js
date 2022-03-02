import { Client } from '../Client.js';
import {
  initLanguageCodeObject,
  defaultLanguage,
  languageCodes
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';

let changeListeners = [];
const resetStore = () => {
  let languageInitialized = {};
  languageCodes.forEach(language => {
    languageInitialized[language] = false;
  });

  return {
    cafes: initLanguageCodeObject(),
    languageInitialized: languageInitialized
  };
};
let { cafes, languageInitialized } = resetStore();

let notifyChange = newLanguage => {
  changeListeners.forEach(listener => {
    listener(newLanguage);
  });
};

let fetchCafes = language => {
  if (languageInitialized[language]) {
    notifyChange(language);
    return;
  }

  let query = Client.items()
    .type('cafe')
    .orderByAscending('system.name');
  if (language) {
    query.languageParameter(language);
  }

  query
    .toPromise()
    .then(response => {
      if (language) {
        cafes[language] = response.data.items;
      } else {
        cafes[defaultLanguage] = response.data.items;
      }
      notifyChange(language);
      languageInitialized[language] = true;
    });
};

class Cafe {
  // Actions

  providePartnerCafes(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchCafes(language);
  }

  provideCompanyCafes(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchCafes(language);
  }

  // Methods

  getPartnerCafes(language) {
    spinnerService.hide('apiSpinner');
    return cafes[language].filter(cafe => cafe.elements.country.value !== 'USA');
  }

  getCompanyCafes(language) {
    spinnerService.hide('apiSpinner');
    return cafes[language].filter(cafe => cafe.elements.country.value === 'USA');
  }

  // Listeners

  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter(element => {
      return element !== listener;
    });
  }
}
let CafeStore = new Cafe();

export { CafeStore, resetStore };
