import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js'
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
      <Header language={props.language} changeLanguage={props.changeLanguage} />
      <Switch>
        <Route path="/:lang?/store" render={(matchProps) => <StorePage {...matchProps} language={props.language} />} />
        <Route path="/:lang?/coffees/:coffeeSlug" render={(matchProps) => <CoffeePage {...matchProps} language={props.language} />} />
        <Route path="/:lang?/brewers/:brewerSlug" render={(matchProps) => <BrewerPage {...matchProps} language={props.language} />} />
        <Route exact path="/:lang?/articles" render={() => <ArticlesPage language={props.language} />} />
        <Route path="/:lang?/articles/:articleId" render={(matchProps) => <ArticlePage {...matchProps} language={props.language} />} />
        <Route path="/:lang?/:urlSlug" render={(matchProps) => <AboutPage {...matchProps} language={props.language} />} />                
        <Route path="/:lang?/cafes" render={() => <CafesPage language={props.language} />} />
        <Route path="/:lang?/contacts" render={() => <ContactsPage language={props.language} />} />
        <Route exact path="/:lang?" render={(matchProps) => <HomePage  {...matchProps} language={props.language} />} />
        <Route path="*" render={(props) => { return <Redirect to="/" push /> }} />
      </Switch>
      <Footer language={props.language} changeLanguage={props.changeLanguage} />
    </div>
  );
}

export default App;
