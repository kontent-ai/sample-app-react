import React from 'react';

import Link from '../Components/LowerCaseUrlLink';
import { useIntl } from 'react-intl';
import { Cafe } from '../Models/content-types/cafe';
import { contentTypes } from '../Models';

interface TestOurCoffeeProps {
  cafes: Cafe[];
}

const TasteOurCoffee: React.FC<TestOurCoffeeProps> = (props) => {
  const { locale: language, formatMessage } = useIntl();
  const cafes = props.cafes.map((cafe: Cafe, index: number) => {
    const name = cafe.system.name;
    const imageLink = cafe.elements.photo.value[0].url;

    return (
      <div className="col-xs-6 col-md-3" key={index} data-kontent-item-id={cafe.system.id}>
        <div>
          <Link to={`/${language}/cafes`} className="ourcoffee-tile-link">
            <h2 className="ourcoffee-tile-text center-text">{name}</h2>
            <span className="cafe-overlay"> </span>
            <img
              alt={name}
              className="ourcoffee-tile-image"
              src={imageLink}
              title={name}
              data-kontent-element-codename={contentTypes.cafe.elements.photo.codename}
            />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="row" data-kontent-element-codename={contentTypes.home.elements.cafes.codename}>
      <div>
        <h1 className="title-tab">
          {formatMessage({ id: 'TasteOurCoffee.title' })}
        </h1>
      </div>
      {cafes}
    </div>
  );
};

export default TasteOurCoffee;
