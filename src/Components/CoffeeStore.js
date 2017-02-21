import React from 'react';
import CoffeeFilter from "./CoffeeFilter";
import Coffees from "./Coffees";

const CoffeeStore = () => {
  return (
    <div className="product-page row">
      <div className="flex">
        <CoffeeFilter />
        <Coffees />
      </div>
    </div>
  );
}

export default CoffeeStore;