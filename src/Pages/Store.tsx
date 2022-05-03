import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import CoffeeStoreContainer from '../Components/CoffeeStoreContainer';
import BrewerStoreContainer from '../Components/BrewerStoreContainer';
import { useIntl } from 'react-intl';

const Store: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="container">
      <div className="container product-page-container">
        <nav className="sub-menu row">
          <div className="store-menu-list row">
            <ul>
              <li>
                <Link to={`coffees`}>
                  {formatMessage({ id: 'Store.coffeesLinkTitle' })}
                </Link>
              </li>
              <li>
                <Link to={`brewers`}>
                  {formatMessage({ id: 'Store.brewersLinkTitle' })}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path={`/`} element={<CoffeeStoreContainer />} />
          <Route path={`/coffees`} element={<CoffeeStoreContainer />} />
          <Route path={`/brewers`} element={<BrewerStoreContainer />} />
        </Routes>
      </div>
    </div>
  );
};

export default Store;
