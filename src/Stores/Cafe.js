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

  Client.items()
  .type('cafe')
  .orderParameter('system.name')
  .get()
  .subscribe(response => {
    cafes = response.items;
    notifyChange();
    initialized = true;
  });
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
    return cafes.filter((cafe) => cafe.country.value !== "USA");
  }

  getCompanyCafes() {
    return cafes.filter((cafe) => cafe.country.value === "USA");
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