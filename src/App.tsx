import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SpinnerLayout from './Components/SpinnerLayout';
import Metadata from './Components/Metadata';
import qs from 'qs';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Store from './Pages/Store';
import Articles from './Pages/Articles';
import Article from './Pages/Article';
import About from './Pages/About';
import { useIntl } from 'react-intl';
import Cafes from './Pages/Cafes';
import Contact from './Pages/Contacts';
import Coffee from './Pages/Coffee';
import Brewer from './Pages/Brewer';
import { SetLanguageType } from './LocalizedApp';
import { NotFound } from './Pages/NotFound';
import { getProjectIdFromCookies, getProjectIdFromEnvironment } from './Client';
import { projectConfigurationPath } from './const';

interface AppProps {
  changeLanguage: SetLanguageType;
}

const App: React.FC<AppProps> = ({ changeLanguage }) => {
  const { formatMessage } = useIntl();

  if (getProjectIdFromEnvironment() === null) {
    return (
      <div>
        Your projectId given in your environment variables is not a valid GUID.
      </div>
    );
  }

  if (
    getProjectIdFromEnvironment() === undefined &&
    !getProjectIdFromCookies()
  ) {
    return <Navigate to={projectConfigurationPath} />;
  }

  // slice(1) removes the `?` at the beginning of `location.search`
  const infoMessage = qs.parse(window.location.search.slice(1)).infoMessage;
  return (
    <SpinnerLayout>
      <div className="application-content">
        <Metadata />
        <Header changeLanguage={changeLanguage} message={infoMessage} />
        <Routes>
          <Route path="/store/*" element={<Store />} />
          <Route path="/coffees/:coffeeSlug" element={<Coffee />} />
          <Route path="/brewers/:brewerSlug" element={<Brewer />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route
            path={`/${formatMessage({ id: 'Route.about' })}`}
            element={<About urlSlug={formatMessage({ id: 'Route.about' })} />}
          />
          <Route path="*" element={<Navigate to="404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </SpinnerLayout>
  );
};

export default App;
