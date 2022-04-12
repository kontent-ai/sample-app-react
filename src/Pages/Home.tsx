import React from 'react'
import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { Client } from "../Client";
import Banner from "../Components/Banner";
import LatestArticles from "../Components/LatestArticles";
import LinkButton from "../Components/LinkButton";
import Metadata from "../Components/Metadata";
import OurStory from "../Components/OurStory";
import TasteOurCoffee from "../Components/TasteOurCoffee";
import { getAboutUsLink } from "../Utilities/ContentLinks";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";
import { useIntl } from 'react-intl';

interface HomeProps {
  language: string
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const { formatMessage } = useIntl();
  const [homeData, setHomeData] = useState(initLanguageCodeObject());

  useEffect(() => {

    spinnerService.show("apiSpinner");

    const query = Client.items().type('home');
    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setHomeData((data: any|null) => ({
          ...data,
          [currentLanguage]: response.data.items[0]
        }));
      });
  }, [language]);

  const homeElements = homeData[language].elements || {};
  const aboutUsLink = getAboutUsLink(language);

  if (!spinnerService.isShowing("apiSpinner")) {
    return (
      <div className="container">
        <Metadata
          title={homeElements.metadataMetaTitle}
          description={homeElements.metadataMetaDescription}
          ogTitle={homeElements.metadataOgTitle}
          ogImage={homeElements.metadataOgImage}
          ogDescription={homeElements.metadataOgDescription}
          twitterTitle={homeElements.metadataMetaTitle}
          twitterSite={homeElements.metadataTwitterSite}
          twitterCreator={homeElements.metadataTwitterCreator}
          twitterDescription={homeElements.metadataTwitterDescription}
          twitterImage={homeElements.metadataTwitterImage}
        />
        {homeElements.heroUnit &&
        homeElements.heroUnit.linkedItems &&
        homeElements.heroUnit.linkedItems.length && (
          <Banner heroUnit={homeElements.heroUnit.linkedItems[0]} />
        )}
        {homeElements.articles && (
          <LatestArticles
            articles={homeElements.articles.linkedItems}
            language={language}
          />
        )}
        <LinkButton
          link={`/${language}/articles`}
          text={formatMessage({ id: 'Home.moreArticles' })}
        />
        {homeElements.ourStory &&
        homeElements.ourStory.linkedItems &&
        homeElements.ourStory.linkedItems.length && (
          <>
            <OurStory fact={homeElements.ourStory.linkedItems[0]} />
            <LinkButton
              link={aboutUsLink}
              text={formatMessage({ id: 'Home.aboutLinkText' })}
            />
          </>
        )}
        {homeElements.cafes &&
        homeElements.cafes.value && (
          <TasteOurCoffee
            cafes={homeElements.cafes.linkedItems}
            language={language}
          />
        )}
        <LinkButton
          link={`/${language}/cafes`}
          text={formatMessage({ id: 'Home.cafesLinkText' })}
        />
      </div>
    );
  }

  return <></>;
}

export default Home;
