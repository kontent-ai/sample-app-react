import * as ArticleStore from '../Stores/Article';
import * as AboutStore from '../Stores/About';
import * as BrewerStore from '../Stores/Brewer';
import * as CafeStore from '../Stores/Cafe';
import * as CoffeeStore from '../Stores/Coffee';

const allStores = [
  AboutStore,
  ArticleStore,
  BrewerStore,
  CafeStore,
  CoffeeStore,
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export { resetStores };
