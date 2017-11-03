import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import App from './App';
import HomePage from './Pages/Home';
import ArticlesPage from './Pages/Articles';
import ArticlePage from './Pages/Article';
import AboutPage from './Pages/About';
import CafesPage from './Pages/Cafes';
import StorePage from './Pages/Store';
import CoffeePage from './Pages/Coffee';
import BrewerPage from './Pages/Brewer';
import ContactsPage from "./Pages/Contacts"
import CoffeeStore from './Components/CoffeeStore';
import BrewerStore from './Components/BrewerStore';

import './index.css';

ReactDOM.render((
  <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage} />
      <Route path="cafes" component={CafesPage} />
      <Route path="articles" component={ArticlesPage} />
      <Route path="articles/:articleSlug" component={ArticlePage} />
      <Route path="store" component={StorePage}>
        <IndexRedirect to="coffees" />
        <Route path="coffees" component={CoffeeStore} />
        <Route path="coffees/:coffeeSlug" component={CoffeePage} />
        <Route path="brewers" component={BrewerStore} />
        <Route path="brewers/:brewerSlug" component={BrewerPage} />
      </Route>
      <Route path="contacts" component={ContactsPage} />
    </Route>
  </Router>
), document.getElementById("root"));