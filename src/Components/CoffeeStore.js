import React from 'react';
import CoffeeFilter from './CoffeeFilter';
import Coffees from './Coffees';

const CoffeeStore = props => {
  return (
    <div className="product-page row">
      <div className="flex">
        <CoffeeFilter />
        <Coffees language={props.language} />
      </div>
    </div>
  );
};

export default CoffeeStore;
