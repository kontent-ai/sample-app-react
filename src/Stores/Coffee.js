import Client from "../Client.js";

let changeListeners = [];
let coffees = [];
let processings = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchCoffees = () => {

  Client.items()
    .type('coffee')
    .orderParameter('elements.product_name')
    .get()
    .subscribe(response => {
      coffees = response.items;
      notifyChange();
    });
}

let fetchFilterProperties = () => {
  Client
    .type('coffee')
    .get()
    .subscribe(response => {
      console.log(response);
      processings = response
        .type
        .elements.find(element => element.codename === "processing")
        .options;
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

    let value = coffee.processing.value;
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
    return coffees.find((coffee) => coffee.urlPattern.value === coffeeSlug);
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