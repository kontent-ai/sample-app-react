import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Components/Header.js';
import HomePage from './Pages/Home';
import ArticlesPage from './Pages/Articles';
import ArticlePage from './Pages/Article';
import AboutPage from './Pages/About';
import CafesPage from './Pages/Cafes';
import StorePage from './Pages/Store';
import CoffeePage from './Pages/Coffee';
import BrewerPage from './Pages/Brewer';
import ContactsPage from "./Pages/Contacts"

const App = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={(matchProps) => <HomePage {...matchProps} />} />
        <Route path="/store" render={(matchProps) => <StorePage {...matchProps} />} />
        <Route path="/coffees/:coffeeSlug" render={(matchProps) => <CoffeePage {...matchProps} />} />
        <Route path="/brewers/:brewerSlug" render={(matchProps) => <BrewerPage {...matchProps} />} />
        <Route exact path="/articles" render={(matchProps) => <ArticlesPage {...matchProps} />} />
        <Route path="/articles/:articleSlug" render={(matchProps) => <ArticlePage {...matchProps} />} />
        <Route path="/about" render={(matchProps) => <AboutPage {...matchProps} />} />
        <Route path="/cafes" render={(matchProps) => <CafesPage {...matchProps} />} />        
        <Route path="/contacts" render={(matchProps) => <ContactsPage {...matchProps} />} />
      </Switch>
    </div>
  );
}

export default App;