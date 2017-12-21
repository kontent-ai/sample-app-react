import React from 'react';
import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';

const Home = (props) => {
  return (
    <div className="container">
      <Banner />
      <LatestArticles language={props.language}/>
      <LinkButton link={`/${props.language}/articles`} text="More articles" />
      <OurStory />
      <LinkButton link={`/${props.language}/about`} text="Read the whole story" />
      <TasteOurCoffee language={props.language}/>
      <LinkButton link={`/${props.language}/cafes`} text="Find out more" />
    </div>
  );
}

export default Home;