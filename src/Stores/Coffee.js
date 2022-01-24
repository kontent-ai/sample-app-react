import { Client } from '../Client.js';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';

let changeListeners = [];
const resetStore = () => ({
  coffees: initLanguageCodeObject(),
  processings: [],
  productStatuses: []
});
let { coffees, processings, productStatuses } = resetStore();

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

let fetchCoffees = language => {
    var query = Client.items()
    .type('coffee')
    .orderByAscending('elements.product_name');

  if (language) {
    query.languageParameter(language);
  }

  query
    .toPromise()
    .then(response => {
            if (language) {
        coffees[language] = response.data.items;
      } else {
        coffees[defaultLanguage] = response.data.items;
      }
      notifyChange();
    });
};

let fetchProcessings = () => {
  Client.taxonomy('processing')
    .toPromise()
    .then(response => {
      processings = response.data.taxonomy.terms;
      notifyChange();
    });
};

let fetchProductStatuses = () => {
  Client.taxonomy('product_status')
    .toPromise()
    .then(response => {
      productStatuses = response.data.taxonomy.terms;
      notifyChange();
    });
};

export class Filter {
  constructor() {
    this.processings = [];
    this.productStatuses = [];
  }

  matches(coffee) {
    return (
      this.matchesProcessings(coffee) && this.matchesProductStatuses(coffee)
    );
  }

  matchesProcessings(coffee) {
    if (this.processings.length === 0) {
      return true;
    }

    let processings = coffee.elements.processing.value.map(x => x.codename);

    return this.processings.some(x => processings.includes(x));
  }

  matchesProductStatuses(coffee) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statuses = coffee.elements.productStatus.value.map(x => x.codename);

    return this.productStatuses.some(x => statuses.includes(x));
  }

  toggleProcessing(processing) {
    let index = this.processings.indexOf(processing);

    if (index < 0) this.processings.push(processing);
    else this.processings.splice(index, 1);
  }

  toggleProductStatus(status) {
    let index = this.productStatuses.indexOf(status);

    if (index < 0) this.productStatuses.push(status);
    else this.productStatuses.splice(index, 1);
  }
}

let coffeeFilter = new Filter();

class Coffee {
  // Actions

  provideCoffee(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchCoffees(language);
  }

  provideCoffees(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchCoffees(language);
  }

  provideProcessings() {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchProcessings();
  }

  provideProductStatuses() {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchProductStatuses();
  }

  // Methods

  getCoffee(coffeeSlug, language) {
    spinnerService.hide('apiSpinner');
    return coffees[language || defaultLanguage].find(
      coffee => coffee.elements.urlPattern.value === coffeeSlug
    );
  }

  getCoffees(language) {
        spinnerService.hide('apiSpinner');
    return coffees[language];
  }

  getProcessings() {
    spinnerService.hide('apiSpinner');
    return processings;
  }

  getProductStatuses() {
    spinnerService.hide('apiSpinner');
    return productStatuses;
  }

  getFilter() {
    return coffeeFilter;
  }

  setFilter(filter) {
    coffeeFilter = filter;
    notifyChange();
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

let CoffeeStore = new Coffee();

export { CoffeeStore, resetStore };
