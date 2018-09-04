import React from 'react';
import { translate } from 'react-translate';

import BackgroundImage from '../Images/banner-default.jpg';

const Banner = props => {
  return (
    <section
      className="banner-section"
      style={{ backgroundImage: 'url(' + BackgroundImage + ')' }}
    >
      <h2 className="banner-heading">{props.t('heading')}</h2>
      <p className="banner-text">{props.t('text')}</p>
    </section>
  );
};

export default translate('Banner')(Banner);
