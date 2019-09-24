import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';
import qs from 'qs';
import { Spinner } from '@simply007org/react-spinners';
import Metadata from './Components/Metadata';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import HomePage from './Pages/Home';
import ArticlesPage from './Pages/Articles';
import ArticlePage from './Pages/Article';
import AboutPage from './Pages/About';
import CafesPage from './Pages/Cafes';
import StorePage from './Pages/Store';
import CoffeePage from './Pages/Coffee';
import BrewerPage from './Pages/Brewer';
import ContactsPage from './Pages/Contacts';

import {
  selectedProjectCookieName,
  projectConfigurationPath
} from './Utilities/SelectedProject';

class App extends Component {
  render() {
    const projectId = this.props.cookies.get(selectedProjectCookieName);
    if (!projectId) {
      return <Redirect to={projectConfigurationPath} />;
    }

    const { language, changeLanguage, location } = this.props;
    // slice(1) removes the `?` at the beginning of `location.search`
    const infoMessage = qs.parse(location.search.slice(1)).infoMessage;
    return (
      <div className="application-content">
        <Metadata />
        <Spinner name="apiSpinner">
          <div className="loader-bg">
            <div className="loader" />
          </div>
        </Spinner>
        <Header
          language={language}
          changeLanguage={changeLanguage}
          message={infoMessage}
        />
        <Switch>
          <Route
            path="/:lang?/store"
            render={matchProps => (
              <StorePage {...matchProps} language={language} />
            )}
          />
          <Route
            path="/:lang?/coffees/:coffeeSlug"
            render={matchProps => (
              <CoffeePage {...matchProps} language={language} />
            )}
          />
          <Route
            path="/:lang?/brewers/:brewerSlug"
            render={matchProps => (
              <BrewerPage {...matchProps} language={language} />
            )}
          />
          <Route
            exact
            path="/:lang?/articles"
            render={() => <ArticlesPage language={language} />}
          />
          <Route
            path="/:lang?/articles/:articleId"
            render={matchProps => (
              <ArticlePage {...matchProps} language={language} />
            )}
          />
          <Route
            path="/:lang?/cafes"
            render={() => <CafesPage language={language} />}
          />
          <Route
            path="/:lang?/contacts"
            render={() => <ContactsPage language={language} />}
          />
          <Route
            exact
            path="/:lang?"
            render={matchProps => (
              <HomePage {...matchProps} language={language} />
            )}
          />
          <Route
            path="/:lang?/:urlSlug?"
            render={matchProps => (
              <AboutPage {...matchProps} language={language} />
            )}
          />
          <Route
            path="*"
            render={() => {
              return <Redirect to="/" push />;
            }}
          />
        </Switch>
        <Footer language={language} />
      </div>
    );
  }
}

export default withCookies(App);
