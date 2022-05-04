import React from 'react';
import RichText from './RichText';
import { HeroUnit } from '../Models/hero_unit';

interface BannerProps {
  heroUnit: HeroUnit;
}

const Banner: React.FC<BannerProps> = (props) => {
  const heroUnit = props.heroUnit.elements;
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
        <RichText element={heroUnit.marketingMessage} className="banner-text" />
      )}
    </section>
  );
};

export default Banner;
