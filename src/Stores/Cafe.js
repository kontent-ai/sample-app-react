import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage,
  languageCodes
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@chevtek/react-spinners';

let unsubscribe = new Subject();
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

let notifyChange = newlanguage => {
  changeListeners.forEach(listener => {
    listener(newlanguage);
  });
};

let fetchCafes = language => {
  if (languageInitialized[language]) {
    notifyChange(language);
    return;
  }

  let query = Client.items()
    .type('cafe')
    .orderParameter('system.name');
  if (language) {
    query.languageParameter(language);
  }

  query
    .getObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      if (language) {
        cafes[language] = response.items;
      } else {
        cafes[defaultLanguage] = response.items;
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
    return cafes[language].filter(cafe => cafe.country.value !== 'USA');
  }

  getCompanyCafes(language) {
    spinnerService.hide('apiSpinner');
    return cafes[language].filter(cafe => cafe.country.value === 'USA');
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

  unsubscribe() {
    unsubscribe.next();
    unsubscribe.complete();
    unsubscribe = new Subject();
  }
}
let CafeStore = new Cafe();

export { CafeStore, resetStore };
