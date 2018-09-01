// import { Client } from "../Client.js";
// import { takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes'
// import { spinnerService } from '@chevtek/react-spinners';

// let unsubscribe = new Subject();
// let changeListeners = [];
// const resetStore = () => ({
//   facts: initLanguageCodeObject()
// });
// let { facts } = resetStore();

// let notifyChange = () => {
//   changeListeners.forEach((listener) => {
//     listener();
//   });
// }

// let fetchFacts = (language, urlSlug) => {
//   let query = Client.items()
//     .type('about_us')
//     .elementsParameter(['facts', 'modular_content', 'title', 'description', 'image']);

//   if (language) {
//     query.languageParameter(language);
//   }

//   if (urlSlug) {
//     query.equalsFilter('elements.url_pattern', urlSlug);
//   }

//   query.getObservable()
//     .pipe(takeUntil(unsubscribe))
//     .subscribe(response => {
//       if (language) {
//         facts[language] = response.items[0].facts;
//       } else {
//         facts[defaultLanguage] = response.items[0].facts;
//       }
//       notifyChange();
//     });
// }

// class Fact {

//   // Actions

//   provideFacts(language, urlSlug) {
//     if (spinnerService.isShowing('apiSpinner') === false) {
//       spinnerService.show('apiSpinner');
//     }
//     fetchFacts(language, urlSlug);
//   }

//   // Methods

//   getFacts(language) {
//     spinnerService.hide('apiSpinner');
//     return facts[language];
//   }

//   // Listeners

//   addChangeListener(listener) {
//     changeListeners.push(listener);
//   }

//   removeChangeListener(listener) {
//     changeListeners = changeListeners.filter((element) => {
//       return element !== listener;
//     });
//   }

//   unsubscribe() {
//     unsubscribe.next();
//     unsubscribe.complete();
//     unsubscribe = new Subject();
//   }
// }

// let FactStore = new Fact();

// export {
//   FactStore,
//   resetStore
// }