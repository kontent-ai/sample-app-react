import React from 'react';
import { translate } from 'react-translate';

const Banner = props => {
  const heroUnit = props.heroUnit;
  const images = heroUnit.image && heroUnit.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <section
      className="banner-section"
      style={
        imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
      }
    >
      <h2 className="banner-heading">
        {heroUnit.title && heroUnit.title.value}
      </h2>
      <p className="banner-text">
        {heroUnit.marketingMessage && (
          <div
            dangerouslySetInnerHTML={{
              __html: heroUnit.marketingMessage.value
            }}
          />
        )}
      </p>
    </section>
  );
};

export default translate('Banner')(Banner);
