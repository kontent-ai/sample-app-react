import React from 'react';
import { translate } from 'react-translate';

import StoryImage from '../Images/our-story.jpg';

const OurStory = props => {
  return (
    <div className="row">
      <h1 className="title-tab">{props.t('title')}</h1>
      <div className="col-sm-12">
        <div
          className="ourstory-section center-text"
          style={{ backgroundImage: 'url(' + StoryImage + ')' }}
        >
          {props.t('text')}
        </div>
      </div>
    </div>
  );
};

export default translate('OurStory')(OurStory);
