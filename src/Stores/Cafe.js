import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let cafes = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchCafes = () => {
  if (initialized) {
    return;
  }

  Client.getItems({
    "system.type": "cafe",
    "order": "system.name"
  }).then((response) => {
    cafes = response.items;
    notifyChange();
  });

  initialized = true;
}

class CafeStore {

  // Actions

  providePartnerCafes() {
    fetchCafes();
  }

  provideCompanyCafes() {
    fetchCafes();
  }

  // Methods

  getPartnerCafes() {
    return cafes.filter((cafe) => cafe.elements.country.value !== "USA");
  }

  getCompanyCafes() {
    return cafes.filter((cafe) => cafe.elements.country.value === "USA");
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

export default new CafeStore();