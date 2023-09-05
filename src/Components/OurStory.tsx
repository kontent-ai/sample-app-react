import React from 'react';
import { FactAboutUs } from '../Models/content-types/fact_about_us';
import RichText from './RichText';
import { contentTypes } from '../Models';

interface OurStoryProps {
  fact: FactAboutUs;
}

const OurStory: React.FC<OurStoryProps> = (props) => {
  const fact = props.fact.elements;
  const images = fact.image && fact.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <div
      className="row"
      data-kontent-item-id={props.fact.system.id}
      data-kontent-element-codename={
        contentTypes.home.elements.our_story.codename
      }
    >
      <h1
        className="title-tab"
        data-kontent-element-codename={
          contentTypes.fact_about_us.elements.title.codename
        }
      >
        {fact.title && fact.title.value}
      </h1>
      <div className="col-sm-12" data-kontent-element-codename={
            contentTypes.fact_about_us.elements.image.codename
          }>
        <div
          className="ourstory-section center-text"
          style={
            imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
          }
          data-kontent-element-codename={
            contentTypes.fact_about_us.elements.description.codename
          }
        >
          {fact.description && <RichText element={fact.description} />}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
