import { Client } from '../Client.js';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';

let changeListeners = [];
const resetStore = () => ({
  home: initLanguageCodeObject()
});
let { home } = resetStore();

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

let fetchHome = language => {
  let query = Client.items().type('home');

  if (language) {
    query.languageParameter(language);
  }

  query
    .toPromise()
    .then(response => {
      if (language) {
                home[language] = response.data.items[0];
      } else {
        home[defaultLanguage] = response.data.items[0];
      }
      notifyChange();
    });
};

class Home {
  // Actions

  provideHome(language, urlSlug) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchHome(language, urlSlug);
  }

  // Methods

  getHome(language) {
        spinnerService.hide('apiSpinner');
    return home[language];
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

let HomeStore = new Home();

export { HomeStore, resetStore };
