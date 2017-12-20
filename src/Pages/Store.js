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
                <Link to={`${props.match.url}/coffees`}>Coffees</Link>
              </li>
              <li>
                <Link to={`${props.match.url}/brewers`}>Brewers</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path={`${props.match.url}`} render={() => <CoffeeStore language={props.language} />} />
          <Route path={`${props.match.url}/coffees`} render={() => <CoffeeStore language={props.language} />} />
          <Route path={`${props.match.url}/brewers`} render={() => <BrewerStore language={props.language} />} />
        </Switch>
      </div>
    </div>
  );
}

export default Store;