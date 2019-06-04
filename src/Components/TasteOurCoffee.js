import React from 'react';
import { translate } from 'react-translate';

import Link from '../Components/LowerCaseUrlLink';

const TasteOurCoffee = props => {
  let cafes = props.cafes.map((cafe, index) => {
    let name = cafe.system.name;
    let imageLink = cafe.photo.value[0].url;

    return (
      <div className="col-xs-6 col-md-3" key={index}>
        <div>
          <Link to={`/${props.language}/cafes`} className="ourcoffee-tile-link">
            <h2 className="ourcoffee-tile-text center-text">{name}</h2>
            <span className="cafe-overlay"> </span>
            <img
              alt={name}
              className="ourcoffee-tile-image"
              src={imageLink}
              title={name}
            />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      <div>
        <h1 className="title-tab">{props.t('title')}</h1>
      </div>
      {cafes}
    </div>
  );
};

export default translate('TasteOurCoffee')(TasteOurCoffee);
