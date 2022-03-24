import * as CafeStore from '../Stores/Cafe';

const allStores = [
  CafeStore,
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export { resetStores };
