import Client from "../Client.js";

import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes'


let changeListeners = [];
let brewers = initLanguageCodeObject();

let manufacturersInitialized = false;
let manufacturers = [];

let productStatusesInitialized = false;
let productStatuses = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchBrewers = (language) => {

  var query = Client.items()
    .type('brewer')
    .orderParameter('elements.product_name');

  if (language) {
    query.languageParameter(language);
  }

  query.get()
    .subscribe(response => {
      if (language) {
        brewers[language] = response.items;
      } else {
        brewers[defaultLanguage] = response.items;
      }
      notifyChange();
    });
}

let fetchManufacturers = () => {
  if (manufacturersInitialized) {
    return;
  }

  Client.taxonomy("manufacturer")
    .get()
    .subscribe(response => {
      manufacturers = response.taxonomy.terms;
      notifyChange();
      manufacturersInitialized = true;
    });
}

let fetchProductStatuses = () => {
  if (productStatusesInitialized) {
    return;
  }

  Client.taxonomy("product_status")
    .get()
    .subscribe(response => {
      productStatuses = response.taxonomy.terms;
      notifyChange();
      productStatusesInitialized = true;
    });
}

export class Filter {
  constructor() {
    this.manufacturers = [];
    this.priceRanges = [];
    this.productStatuses = [];
  }

  matches(brewer) {
    return this.matchesManufacturers(brewer) && this.matchesPriceRanges(brewer) && this.matchesProductStatuses(brewer);
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

    return this.priceRanges.some((priceRange) => priceRange.min <= price && price <= priceRange.max);
  }

  matchesProductStatuses(brewer) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statusCodenames = brewer.productStatus.value.map(x => x.codename);
    return statusCodenames.some((x) => this.productStatuses.includes(x));
  }

  toggleManufacturer(manufacturer) {
    let index = this.manufacturers.indexOf(manufacturer);

    if (index < 0) this.manufacturers.push(manufacturer); else this.manufacturers.splice(index, 1);
  }

  togglePriceRange(priceRange) {
    let index = this.priceRanges.findIndex((x) => x.min === priceRange.min && x.max === priceRange.max);

    if (index < 0) this.priceRanges.push(priceRange); else this.priceRanges.splice(index, 1);
  }

  toggleProductStatus(productStatus) {
    let index = this.productStatuses.indexOf(productStatus);

    if (index < 0) this.productStatuses.push(productStatus); else this.productStatuses.splice(index, 1);
  }
}

let brewerFilter = new Filter();

class BrewerStore {

  // Actions

  provideBrewer(brewerSlug, language) {
    fetchBrewers(language);
  }

  provideBrewers(language) {
    fetchBrewers(language);
  }

  provideManufacturers() {
    fetchManufacturers();
  }

  provideProductStatuses() {
    fetchProductStatuses();
  }

  // Methods

  getBrewer(brewerSlug, language) {
    return brewers[language || defaultLanguage].find((brewer) => brewer.urlPattern.value === brewerSlug);
  }

  getBrewers(language) {
    return brewers[language];
  }

  getManufacturers() {
    return manufacturers;
  }

  getProductStatuses() {
    return productStatuses;
  }

  getFilter() {
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
    changeListeners = changeListeners.filter((element) => {
      return element !== listener;
    });
  }

}

export default new BrewerStore();
