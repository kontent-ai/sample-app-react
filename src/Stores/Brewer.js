import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@chevtek/react-spinners';

let unsubscribe = new Subject();
let changeListeners = [];
const resetStore = () => ({
  brewers: initLanguageCodeObject()
});
let { brewers } = resetStore();

let manufacturersInitialized = false;
let manufacturers = [];

let productStatusesInitialized = false;
let productStatuses = [];

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

let fetchBrewers = language => {
  var query = Client.items()
    .type('brewer')
    .orderParameter('elements.product_name');

  if (language) {
    query.languageParameter(language);
  }

  query
    .getObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      if (language) {
        brewers[language] = response.items;
      } else {
        brewers[defaultLanguage] = response.items;
      }
      notifyChange();
    });
};

let fetchManufacturers = () => {
  if (manufacturersInitialized) {
    return;
  }

  Client.taxonomy('manufacturer')
    .getObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      manufacturers = response.taxonomy.terms;
      notifyChange();
      manufacturersInitialized = true;
    });
};

let fetchProductStatuses = () => {
  if (productStatusesInitialized) {
    return;
  }

  Client.taxonomy('product_status')
    .getObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
      productStatuses = response.taxonomy.terms;
      notifyChange();
      productStatusesInitialized = true;
    });
};

export class Filter {
  constructor() {
    this.manufacturers = [];
    this.priceRanges = [];
    this.productStatuses = [];
  }

  matches(brewer) {
    return (
      this.matchesManufacturers(brewer) &&
      this.matchesPriceRanges(brewer) &&
      this.matchesProductStatuses(brewer)
    );
  }

  matchesManufacturers(brewer) {
    if (this.manufacturers.length === 0) {
      return true;
    }

    let manufacturerCodenames = brewer.manufacturer.value.map(x => x.codename);
    return manufacturerCodenames.some(x => this.manufacturers.includes(x));
  }

  matchesPriceRanges(brewer) {
    if (this.priceRanges.length === 0) {
      return true;
    }

    let price = brewer.price.value;

    return this.priceRanges.some(
      priceRange => priceRange.min <= price && price <= priceRange.max
    );
  }

  matchesProductStatuses(brewer) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statusCodenames = brewer.productStatus.value.map(x => x.codename);
    return statusCodenames.some(x => this.productStatuses.includes(x));
  }

  toggleManufacturer(manufacturer) {
    let index = this.manufacturers.indexOf(manufacturer);

    if (index < 0) this.manufacturers.push(manufacturer);
    else this.manufacturers.splice(index, 1);
  }

  togglePriceRange(priceRange) {
    let index = this.priceRanges.findIndex(
      x => x.min === priceRange.min && x.max === priceRange.max
    );

    if (index < 0) this.priceRanges.push(priceRange);
    else this.priceRanges.splice(index, 1);
  }

  toggleProductStatus(productStatus) {
    let index = this.productStatuses.indexOf(productStatus);

    if (index < 0) this.productStatuses.push(productStatus);
    else this.productStatuses.splice(index, 1);
  }
}

let brewerFilter = new Filter();

class Brewer {
  // Actions

  provideBrewer(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchBrewers(language);
  }

  provideBrewers(language) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchBrewers(language);
  }

  provideManufacturers() {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchManufacturers();
  }

  provideProductStatuses() {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchProductStatuses();
  }

  // Methods

  getBrewer(brewerSlug, language) {
    spinnerService.hide('apiSpinner');
    return brewers[language || defaultLanguage].find(
      brewer => brewer.urlPattern.value === brewerSlug
    );
  }

  getBrewers(language) {
    spinnerService.hide('apiSpinner');
    return brewers[language];
  }

  getManufacturers() {
    spinnerService.hide('apiSpinner');
    return manufacturers;
  }

  getProductStatuses() {
    spinnerService.hide('apiSpinner');
    return productStatuses;
  }

  getFilter() {
    spinnerService.hide('apiSpinner');
    return brewerFilter;
  }

  setFilter(filter) {
    brewerFilter = filter;
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

  unsubscribe() {
    unsubscribe.next();
    unsubscribe.complete();
    unsubscribe = new Subject();
  }
}

let BrewerStore = new Brewer();

export { BrewerStore, resetStore };
