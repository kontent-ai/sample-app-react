import Client from "../Client.js";

let changeListeners = [];
let coffees = [];
let processings = [];

let coffeesPromise = null;
let filterPropertiesPromise = null;

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

let fetchFilterProperties = () => {
  if (filterPropertiesPromise) {
    return;
  }

  filterPropertiesPromise = Client.getType("coffee").then((response) => {
    processings = response.elements.processing.options;
    notifyChange();
  });
};

export class Filter {
  constructor() {
    this.processings = [];
    this.productStatuses = [];
  }

  matches(coffee) {
    return this.matchesProcessings(coffee);
  }

  matchesProcessings(coffee) {
    if (this.processings.length === 0) {
      return true;
    }

    let value = coffee.elements.processing.value;
    let processing = value.length > 0 ? value[0].codename : null;

    return this.processings.indexOf(processing) >= 0;
  }

  toggleProcessing(processing) {
    let index = this.processings.indexOf(processing);

    if (index < 0) this.processings.push(processing); else this.processings.splice(index, 1);
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
    fetchFilterProperties();
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