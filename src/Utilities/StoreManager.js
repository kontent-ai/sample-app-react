import * as ArticleStore from '../Stores/Article';
import * as BrewerStore from '../Stores/Brewer';
import * as CafeStore from '../Stores/Cafe';
import * as CoffeeStore from '../Stores/Coffee';

const allStores = [
  ArticleStore,
  BrewerStore,
  CafeStore,
  CoffeeStore,
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export { resetStores };
