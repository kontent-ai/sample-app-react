import * as ArticleStore from '../Stores/Article';
import * as AboutStore from '../Stores/About';
import * as BrewerStore from '../Stores/Brewer';
import * as CafeStore from '../Stores/Cafe';
import * as CoffeeStore from '../Stores/Coffee';
import * as HomeStore from '../Stores/Home';

const allStores = [
  AboutStore,
  ArticleStore,
  BrewerStore,
  CafeStore,
  CoffeeStore,
  HomeStore
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export { resetStores };
