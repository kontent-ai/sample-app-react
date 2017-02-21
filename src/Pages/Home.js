import React from 'react';
import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';

const Home = () => {
  return (
    <div className="container">
      <Banner />
      <LatestArticles />
      <LinkButton link="/articles" text="More articles" />
      <OurStory />
      <LinkButton link="/about" text="Read the whole story" />
      <TasteOurCoffee />
      <LinkButton link="/cafes" text="Find out more" />
    </div>
  );
}

export default Home;