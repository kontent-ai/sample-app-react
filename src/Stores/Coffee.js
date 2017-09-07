import Client from "../Client.js";

let changeListeners = [];
let coffees = [];
let processings = [];
let productStatuses = [];
let coffeesPromise = null;
let processingPromise = null;
let statusesPromise = null;

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchCoffees = () => {
  if (coffeesPromise) {
    return;
  }

  coffeesPromise = Client.getItems({
    "system.type": "coffee",
    "order": "elements.product_name"
  }).then((response) => {
    coffees = response.items;
    notifyChange();
  });
}

let fetchProcessings = () => {
  if (processingPromise) {
    return;
  }

  processingPromise = Client.getTaxonomy("processing").then((response) => {
    processings = response.terms;
    notifyChange();
  });
};

let fetchStatuses = () => {
  if (statusesPromise) {
    return;
  }

    statusesPromise = Client.getTaxonomy("product_status").then((response) => {
        productStatuses = response.terms;
        notifyChange();
    });
}

export class Filter {
  constructor() {
    this.processings = [];
    this.productStatuses = [];
  }

  matches(coffee) {
    return this.matchesProcessings(coffee) && this.matchesProductStatuses(coffee);
  }

  matchesProcessings(coffee) {
    if (this.processings.length === 0) {
      return true;
    }

    let value = coffee.elements.processing.value;
    let processing = value.length > 0 ? value[0].codename : null;

    return this.processings.indexOf(processing) >= 0;
  }

  matchesProductStatuses(cofee) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statuses = cofee.elements.product_status.value.map(x => x.codename);

    return this.productStatuses.some(x => statuses.includes(x));
  }

  toggleProcessing(processing) {
    let index = this.processings.indexOf(processing);

    if (index < 0) this.processings.push(processing); else this.processings.splice(index, 1);
  }

  toggleProductStatus(status) {
    let index = this.productStatuses.indexOf(status);

    if (index < 0) this.productStatuses.push(status); else this.productStatuses.splice(index, 1);
  }
}

let coffeeFilter = new Filter();

class CoffeeStore {

  // Actions

  provideCoffee(coffeeSlug) {
    fetchCoffees();
  }

  provideCoffees() {
    fetchCoffees();
  }

  provideProcessings() {
    fetchProcessings();
  }

  provideProductStatuses() {
    fetchStatuses();
  }

  // Methods

  getCoffee(coffeeSlug) {
    return coffees.find((coffee) => coffee.elements.url_pattern.value === coffeeSlug);
  }

  getCoffees() {
    return coffees;
  }

  getProcessings() {
    return processings;
  }

  getProductStatuses() {
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
    changeListeners = changeListeners.filter((element) => {
      return element !== listener;
    });
  }

}

export default new CoffeeStore();
