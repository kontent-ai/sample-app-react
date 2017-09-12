import Client from "../Client.js";

let changeListeners = [];
let coffees = [];
let processings = [];
<<<<<<< HEAD
let productStatuses = [];
=======
>>>>>>> dfdf3cdf9c55f728201d18c9ed3d7c225a8f332c

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

<<<<<<< HEAD
let fetchProcessings = () => {
  Client.taxonomy("processing")
    .get()
    .subscribe(response => {
      processings = response.terms;
      notifyChange();
=======
let fetchFilterProperties = () => {
  Client
    .type('coffee')
    .get()
    .subscribe(response => {
      processings = response
        .type
        .elements.find(element => element.codename === "processing")
        .options;
>>>>>>> dfdf3cdf9c55f728201d18c9ed3d7c225a8f332c
    });
};

let fetchProductStatuses = () => {
  Client.taxonomy("product_status")
    .get()
    .subscribe(response => {
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

<<<<<<< HEAD
    let processings = coffee.processing.value.map(x => x.codename);
=======
    let value = coffee.processing.value;
    let processing = value.length > 0 ? value[0].codename : null;
>>>>>>> dfdf3cdf9c55f728201d18c9ed3d7c225a8f332c

    return this.processings.some(x => processings.includes(x));
  }

  matchesProductStatuses(coffee) {
    if (this.productStatuses.length === 0) {
      return true;
    }

    let statuses = coffee.productStatus.value.map(x => x.codename);

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
    fetchProductStatuses();
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
