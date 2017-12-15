import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import CoffeeStore from '../Components/CoffeeStore';
import BrewerStore from '../Components/BrewerStore';

const Store = (props) => {
  return (
    <div className="container">
      <div className="container product-page-container">
        <nav role="navigation" className="sub-menu row">
          <div className="store-menu-list row">
            <ul>
              <li>
                <Link to="/store/coffees">Coffees</Link>
              </li>
              <li>
                <Link to="/store/brewers">Brewers</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path={`${props.match.url}`} render={() => <CoffeeStore />} />
          <Route path={`${props.match.url}/coffees`} render={() => <CoffeeStore />} />          
          <Route path={`${props.match.url}/brewers`} render={() => <BrewerStore />} />
        </Switch>
      </div>
    </div>
  );
}

export default Store;