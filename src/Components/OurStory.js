import React from 'react';
import { translate } from 'react-translate';
import RichTextElement from './RichTextElement';

const OurStory = props => {
  const fact = props.fact;
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
          {fact.description && <RichTextElement element={fact.description} />}
        </div>
      </div>
    </div>
  );
};

export default translate('OurStory')(OurStory);
