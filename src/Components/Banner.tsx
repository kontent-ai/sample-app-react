import React from 'react';
import { HeroUnit } from '../Models/content-types/hero_unit';
import RichText from './RichText';
import { contentTypes } from '../Models';

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
      data-kontent-item-id={props.heroUnit.system.id}
      data-kontent-element-codename={contentTypes.hero_unit.codename}
      style={
        imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
      }
    >
      <h2
        className="banner-heading"
        data-kontent-element-codename={
          contentTypes.hero_unit.elements.title.codename
        }
      >
        {heroUnit.title && heroUnit.title.value}
      </h2>
      {heroUnit.marketingMessage && (
        <RichText
          element={heroUnit.marketingMessage}
          className="banner-text"
          data-kontent-element-codename={
            contentTypes.hero_unit.elements.marketing_message.codename
          }
        />
      )}
    </section>
  );
};

export default Banner;
