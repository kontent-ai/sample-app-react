import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let coffees = [];

let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });
}

let fetchCoffees = () => {
    if (initialized) {
        return;
    }

    Client.getItems({
        "system.type": "coffee",
        "order": "elements.product_name"
    }).then((response) => {
        coffees = response.items;
        notifyChange();
    });

    initialized = true;
}

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

        return this.processings.indexOf(coffee.elements.processing.value) >= 0;
    }

    toggleProcessing(processing) {
        let index = this.processings.indexOf(processing);

        if (index < 0) this.processings.push(processing); else this.processings.splice(index, 1);
    }
}

let coffeeFilter = new Filter();

class CoffeeStore {

    // Actions

    provideCoffee(coffeeId) {
        fetchCoffees();
    }

    provideCoffees() {
        fetchCoffees();
    }

    // Methods

    getCoffee(coffeeCodename) {
        return coffees.find((coffee) => coffee.system.codename === coffeeCodename);
    }

    getCoffees() {
        return coffees;
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