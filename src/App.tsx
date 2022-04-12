import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { projectConfigurationPath, selectedProjectCookieName } from './const';
import SpinnerLayout from './Components/SpinnerLayout';
import Metadata from './Components/Metadata';
import qs from 'qs';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Store from './Pages/Store';
import Articles from './Pages/Articles';
import Article from './Pages/Article';


interface AppProps{
  language: string,
  changeLanguage: (newLanguage: any, newUrl: any) => void
}

const App: React.FC<AppProps> = (props) => {
  const [cookie] = useCookies([selectedProjectCookieName])
  // const { pathname } = useLocation();
  // const location = pathname;
  //const projectId = this.props.cookies.get(selectedProjectCookieName);

  if (!cookie.ProjectId) {
    return <Navigate to={projectConfigurationPath} />;
  }

  const { language, changeLanguage} = props;
  // slice(1) removes the `?` at the beginning of `location.search`
  const infoMessage = qs.parse(window.location.search.slice(1)).infoMessage;
  return (
    <SpinnerLayout>
      <div className="application-content">
        <Metadata />
        <Header
          language={language}
          changeLanguage={changeLanguage}
          message={infoMessage}
        />
        <Routes>
          <Route
            path="/store/*"
            element={
              <Store language={language} />
            }
          />
        {/*  <Route*/}
        {/*    path="/:lang?/coffees/:coffeeSlug"*/}
        {/*    render={matchProps => (*/}
        {/*      <CoffeePage {...matchProps} language={language} />*/}
        {/*    )}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path="/:lang?/brewers/:brewerSlug"*/}
        {/*    render={matchProps => (*/}
        {/*      <BrewerPage {...matchProps} language={language} />*/}
        {/*    )}*/}
        {/*  />*/}
          <Route
            path="/articles"
            element={<Articles language={language} />}
          />
          <Route
            path="/articles/:articleId"
            element={<Article  language={language} />}
          />
        {/*  <Route*/}
        {/*    path="/:lang?/cafes"*/}
        {/*    render={() => <CafesPage language={language} />}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path="/:lang?/contacts"*/}
        {/*    render={() => <ContactsPage language={language} />}*/}
        {/*  />*/}
          <Route
            path="/"
            element={
              <Home language={language} />
            }
          />
        {/*  <Route*/}
        {/*    path="/:lang?/:urlSlug?"*/}
        {/*    render={matchProps => (*/}
        {/*      <AboutPage {...matchProps} language={language} />*/}
        {/*    )}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path="*"*/}
        {/*    render={() => {*/}
        {/*      return <Redirect to="/" push />;*/}
        {/*    }}*/}
        {/*  />*/}
        </Routes>
        <Footer language={language} />
      </div>
    </SpinnerLayout>
  );
}

export default App;