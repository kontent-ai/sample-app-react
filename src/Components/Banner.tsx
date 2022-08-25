import React from 'react';
import { HeroUnit } from '../Models/content-types/hero_unit';
import RichText from './RichText';

interface BannerProps {
  heroUnit: HeroUnit;
}

const Banner: React.FC<BannerProps> = (props) => {
  const heroUnit = props.heroUnit.elements;
  const images = heroUnit.image && heroUnit.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <section
      data-kontent-item-id={props.heroUnit.system.id}
      className="banner-section"
      style={
        imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
      }
    >
      <h2
        className="banner-heading"
        data-kontent-element-codename="title"
      >
        {heroUnit.title && heroUnit.title.value}
      </h2>
      {heroUnit.marketingMessage && (
        <div data-kontent-element-codename="marketing_message">
          <RichText
            element={heroUnit.marketingMessage}
            className="banner-text" />
        </div>
      )}
    </section>
  );
};

export default Banner;
