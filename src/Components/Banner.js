import React from 'react';
import { translate } from 'react-translate';
import RichTextElement from './RichTextElement';

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
      {heroUnit.marketingMessage && (
        <RichTextElement
          element={heroUnit.marketingMessage}
          className="banner-text"
        />
      )}
    </section>
  );
};

export default translate('Banner')(Banner);
