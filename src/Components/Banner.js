import React from 'react';
import BackgroundImage from '../Images/banner-default.jpg';

const Banner = (props) => {
  return (
    <section className="banner-section" style={{ backgroundImage: "url(" + BackgroundImage + ")" }}>
      <h2 className="banner-heading">Roasting premium coffee</h2>
      <p className="banner-text">
        Discover the fascinating world of Dancing Goat high-quality coffee and you will never miss a single coffee break again.
            </p>
    </section>
  );
}

export default Banner;