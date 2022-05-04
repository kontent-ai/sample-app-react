import React from 'react';
import RichText from './RichText';
import { FactAboutUs } from '../Models/fact_about_us';

interface OurStoryProps {
  fact: FactAboutUs;
}

const OurStory: React.FC<OurStoryProps> = (props) => {
  const fact = props.fact.elements;
  const images = fact.image && fact.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <div className="row">
      <h1 className="title-tab">{fact.title && fact.title.value}</h1>
      <div className="col-sm-12">
        <div
          className="ourstory-section center-text"
          style={
            imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
          }
        >
          {fact.description && <RichText element={fact.description} />}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
