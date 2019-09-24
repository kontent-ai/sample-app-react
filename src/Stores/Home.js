import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';

let unsubscribe = new Subject();
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
    .toObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      if (language) {
        home[language] = response.items[0];
      } else {
        home[defaultLanguage] = response.items[0];
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

  unsubscribe() {
    unsubscribe.next();
    unsubscribe.complete();
    unsubscribe = new Subject();
  }
}

let HomeStore = new Home();

export { HomeStore, resetStore };
