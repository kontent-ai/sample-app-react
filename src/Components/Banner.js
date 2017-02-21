import React from 'react';

const Banner = (props) => {
  return (
    <section className="banner-section" style={{ backgroundImage: "url(/src/Images/banner-default.jpg)" }}>
      <h2 className="banner-heading">Roasting premium coffee</h2>
      <p className="banner-text">
        Discover the fascinating world of Dancing Goat high-quality coffee and you will never miss a single coffee break again.
            </p>
    </section>
  );
}

export default Banner;