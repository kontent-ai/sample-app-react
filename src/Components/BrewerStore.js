import React from 'react';
import BrewerFilter from "./BrewerFilter";
import Brewers from "./Brewers";

const BrewerStore = (props) => {
  return (
    <div className="product-page row">
      <div className="flex">
        <BrewerFilter />
        <Brewers language={props.language}/>
      </div>
    </div>
  );
}

export default BrewerStore;