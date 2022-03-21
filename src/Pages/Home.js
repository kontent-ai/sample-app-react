import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import Banner from "../Components/Banner";
import LatestArticles from "../Components/LatestArticles";
import LinkButton from "../Components/LinkButton";
import Metadata from "../Components/Metadata";
import OurStory from "../Components/OurStory";
import TasteOurCoffee from "../Components/TasteOurCoffee";
import { getAboutUsLink } from "../Utilities/ContentLinks";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";

const Home = ({ language, t }) => {

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
        setHomeData(data => ({
          ...data,
          [currentLanguage]: response.data.items[0]
        }));
      });
  }, [language]);

  const homeElements = homeData[language].elements || {};
  const aboutUsLink = getAboutUsLink(language);

  return !spinnerService.isShowing("apiSpinner") && (
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
        text={t('moreArticles')}
      />
      {homeElements.ourStory &&
        homeElements.ourStory.linkedItems &&
        homeElements.ourStory.linkedItems.length && (
          <>
            <OurStory fact={homeElements.ourStory.linkedItems[0]} />
            <LinkButton
              link={aboutUsLink}
              text={t('aboutLinkText')}
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
        text={t('cafesLinkText')}
      />
    </div>
  );
}

export default translate('Home')(Home);
