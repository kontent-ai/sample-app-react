import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let brewers = [];

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

    return this.manufacturers.indexOf(brewer.elements.manufacturer.value) >= 0;
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

    let status = brewer.elements.product_status.value;

    return status.some((x) => this.productStatuses.indexOf(x.name) >= 0);
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

  // Methods

  getBrewer(brewerSlug) {
    return brewers.find((brewer) => brewer.elements.url_pattern.value === brewerSlug);
  }

  getBrewers() {
    return brewers;
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