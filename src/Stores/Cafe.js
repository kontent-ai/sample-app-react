import Client from "../Client.js";

import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes'

let changeListeners = [];
let initialized = false;
let cafes = initLanguageCodeObject();


let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchCafes = (language) => {
  if (initialized) {
    return;
  }

  let query = Client.items()
    .type('cafe')
    .orderParameter('system.name')
  if (language) {
    query.languageParameter(language);
  }

  query.get()
    .subscribe(response => {
      if (language) {
        cafes[language] = response.items;
      } else {
        cafes[defaultLanguage] = response.items;
      }
      notifyChange();
      initialized = true;
    });
}

class CafeStore {

  // Actions

  providePartnerCafes(language) {
    fetchCafes(language);
  }

  provideCompanyCafes(language) {
    fetchCafes(language);
  }

  // Methods

  getPartnerCafes(language) {
    return cafes[language].filter((cafe) => cafe.country.value !== "USA");
  }

  getCompanyCafes(language) {
    return cafes[language].filter((cafe) => cafe.country.value === "USA");
  }

  // Listeners

  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter((element) => {
      return element !== listener;
    });
  }

}

export default new CafeStore();