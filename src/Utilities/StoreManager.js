import * as CafeStore from '../Stores/Cafe';
import * as CoffeeStore from '../Stores/Coffee';

const allStores = [
  CafeStore,
  CoffeeStore,
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export { resetStores };
