import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let facts = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchFacts = () => {
  if (initialized) {
    return;
  }

  Client.getItem("about_us").then((response) => {
    facts = response.item.elements.facts.value.map((codename) => response.modular_content[codename]);
    notifyChange();
  });

  initialized = true;
}

class FactStore {

  // Actions

  provideFacts() {
    fetchFacts();
  }

  // Methods

  getFacts() {
    return facts;
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

export default new FactStore();