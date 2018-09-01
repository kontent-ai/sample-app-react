import * as ArticleStore from '../Stores/Article';
import * as AboutStore from '../Stores/About';
import * as BrewerStore from '../Stores/Brewer';
import * as CafeStore from '../Stores/Cafe';
import * as CoffeeStore from '../Stores/Coffee';
import * as FactStore from '../Stores/Fact';

const allStores = [
  AboutStore,
  ArticleStore,
  BrewerStore,
  CafeStore,
  CoffeeStore,
  FactStore
];

const resetStores = () => allStores.forEach(store => store.resetStore());

export {
  resetStores
}