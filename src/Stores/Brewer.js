import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let brewers = [];

let manufacturersInitialized = false;
let manufacturers = [];

let statusesInitialized = false;
let statuses = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchBrewers = () => {
  if (initialized) {
    return;
  }

  Client.getItems({
    "system.type": "brewer",
    "order": "elements.product_name"
  }).then((response) => {
    brewers = response.items;
    notifyChange();
  });

  initialized = true;
}

let fetchManufacturers = () => {
  if (manufacturersInitialized) {
    return;
  }

  Client.getTaxonomy("manufacturer")
    .then((response) => {
      manufacturers = response.terms;
      notifyChange();
    });

  manufacturersInitialized = true;
}

let fetchStatuses = () => {
  if (statusesInitialized) {
    return;
  }

  Client.getTaxonomy("product_status")
    .then((response) => {
      statuses = response.terms;
      notifyChange();
    });

  manufacturersInitialized = true;
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

    let manufacturerCodenames = brewer.elements.manufacturer.value.map(x => x.codename);
    return manufacturerCodenames.some(x => this.manufacturers.includes(x));
  }

  matchesPriceRanges(brewer) {
    if (this.priceRanges.length === 0) {
      return true;
    }

    let price = brewer.elements.price.value;

    return this.priceRanges.some((priceRange) => priceRange.min <= price && price <= priceRange.max);
  }

  matchesProductStatuses(brewer) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statusCodenames = brewer.elements.product_status.value.map(x => x.codename);
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

  provideBrewer(brewerSlug) {
    fetchBrewers();
  }

  provideBrewers() {
    fetchBrewers();
  }

  provideManufacturers() {
    fetchManufacturers();
  }

  provideStatuses() {
    fetchStatuses();
  }

  // Methods

  getBrewer(brewerSlug) {
    return brewers.find((brewer) => brewer.elements.url_pattern.value === brewerSlug);
  }

  getBrewers() {
    return brewers;
  }

  getManufacturers() {
    return manufacturers;
  }

  getStatuses() {
    return statuses;
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
