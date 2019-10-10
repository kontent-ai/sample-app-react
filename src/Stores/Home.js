import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';
import { getVariation } from './experiments';

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

let homeLoaded = (homeItem, language) => {
  if (language) {
    home[language] = homeItem;
  } else {
    home[defaultLanguage] = homeItem;
  }
  notifyChange();
};

let fetchHomeVariant = (originalHome, language, experimentId, variantId) => {
  let query = Client.items()
    .type('home')
    .limitParameter(1);

  if (language) {
    query.languageParameter(language);
  }

  // Filter by specific experiment and variant
  const experimentPrefix = experimentId;
  const variantPrefix = variantId ? `/${variantId}` : '';
  const startsWith = encodeURIComponent(
    `["${experimentPrefix}${variantPrefix}"`
  );

  query.rangeFilter('elements.a_b_testing', startsWith, startsWith + '~');

  // Make sure the home pages in the result are ordered in the order of variants (original first)
  query.orderByAscending('elements.a_b_testing');

  query
    .toObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      const homeItem = response.items[0] || originalHome;
      if (homeItem) {
        homeLoaded(homeItem, language);
      }
    });
};

let ensureHomeVariant = async (homeItem, language) => {
  const abTesting = JSON.parse(homeItem.abTesting.value);
  const structuredValue = abTesting[1];
  const experiment = structuredValue && structuredValue.experiment;
  if (experiment && experiment.id && experiment.key) {
    const chosenVariation = await getVariation(experiment.id, experiment.key);
    const expectedVariantId = `${chosenVariation}`;

    const variant = structuredValue.variant;
    const variantId = variant && variant.id;
    if (variantId === undefined || expectedVariantId === variantId) {
      // Correct variant already loaded
      homeLoaded(homeItem, language);
    } else {
      // Fetch another variant
      fetchHomeVariant(homeItem, language, experiment.id, expectedVariantId);
    }
  } else {
    // Not in an experiment
    homeLoaded(homeItem, language);
  }
};

let fetchHome = language => {
  let query = Client.items()
    .type('home')
    .limitParameter(1);

  if (language) {
    query.languageParameter(language);
  }

  // Make sure the home pages in the result are ordered in the order of variants (original first)
  query.orderByAscending('elements.a_b_testing');

  query
    .toObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      const homeItem = response.items[0];

      // If experiment is selected, make sure to load the right variant
      if (homeItem.abTesting) {
        ensureHomeVariant(homeItem, language);
      } else {
        homeLoaded(homeItem, language);
      }
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
