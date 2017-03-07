import React from 'react';
import StoryImage from '../Images/our-story.jpg';

const OurStory = () => {
  return (
    <div className="row">
      <h1 className="title-tab">Our Story</h1>
      <div className="col-sm-12">
        <div className="ourstory-section center-text" style={{ backgroundImage: "url(" + StoryImage + ")" }}>
          At Dancing Goat, we strive to do things right.
            Not only do we source the best coffees you can get your hands on.
            We also make sure we have a direct relationship with our farmers.
            Visiting the micro farms where we source our coffees is our daily bread.
            This way, we can guarantee the highest quality standard all year long.
            No middle-men, no unfair shares.
            Our farmers get the best deal possible.
            So do you.
        </div>
      </div>
    </div>
  );
};

export default OurStory;