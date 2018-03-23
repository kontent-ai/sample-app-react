import React from 'react';
import { translate } from 'react-translate'

import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';

import { englishCode, spanishCode } from '../Utilities/LanguageCodes';

const Home = (props) => {
  return (
    <div className="container">
      <Banner />
      <LatestArticles language={props.language} />
      <LinkButton link={`/${props.language}/articles`} text={props.t("moreArticles")} />
      <OurStory />
      {
        props.language && props.language.toLowerCase() === englishCode.toLowerCase() ?
          <LinkButton link={`/${props.language}/about-us`} text={props.t("aboutLinkText")} />
          : props.language && props.language.toLowerCase() === spanishCode.toLowerCase() ?
            <LinkButton link={`/${props.language}/acerca-de`} text={props.t("aboutLinkText")} />
            : null
      }
      <TasteOurCoffee language={props.language} />
      <LinkButton link={`/${props.language}/cafes`} text={props.t("cafesLinkText")} />
    </div>
  );
}

export default translate("Home")(Home);