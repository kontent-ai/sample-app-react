import Client from "../Client.js";

import { initLanguageCodeObject, defaultLanguage, languageCodes } from '../Utilities/LanguageCodes'

let changeListeners = [];
let cafes = initLanguageCodeObject();
let languageInitialized = {};
languageCodes.forEach((language) => {
  languageInitialized[language] = false;
})


let notifyChange = (newlanguage) => {
  changeListeners.forEach((listener) => {
    listener(newlanguage);
  });
}

let fetchCafes = (language) => {
  if(languageInitialized[language]){
    notifyChange(language);
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
      notifyChange(language);
      languageInitialized[language] = true;
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