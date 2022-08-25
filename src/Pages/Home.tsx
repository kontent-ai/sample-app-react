import React, { useCallback } from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { Client } from '../Client';
import Banner from '../Components/Banner';
import LatestArticles from '../Components/LatestArticles';
import LinkButton from '../Components/LinkButton';
import Metadata from '../Components/Metadata';
import OurStory from '../Components/OurStory';
import TasteOurCoffee from '../Components/TasteOurCoffee';
import { getAboutUsLink } from '../Utilities/ContentLinks';
import {
  defaultLanguage,
  initLanguageCodeObject,
} from '../Utilities/LanguageCodes';
import { useIntl } from 'react-intl';
import { Home as HomeType } from '../Models/content-types/home';
import { contentTypes } from '../Models/project/contentTypes';
import { ChangeFeedItem } from '../types';

type HomeProps = {
  changes: ChangeFeedItem[]
}

const Home: React.FC<HomeProps> = ({ changes }) => {
  const { locale: language, formatMessage } = useIntl();
  const [homeData, setHomeData] = useState(initLanguageCodeObject<HomeType>());

  const refetchData = useCallback((): void => {
    spinnerService.show('apiSpinner');

    const query = Client.items<HomeType>().type(contentTypes.home.codename);
    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setHomeData((data) => ({
        ...data,
        [currentLanguage]: response.data.items[0] as HomeType,
      }));
    });
  }, [language]);


  useEffect(() => {
    refetchData();
  }, [language, refetchData]);

  useEffect(() => {
    if (changes.length === 0) {
      return;
    }
    console.log('Update changes', changes.map(change => change.codename));
    refetchData();
  }, [changes, refetchData])

  const homeElements = homeData[language]?.elements;
  const aboutUsLink = getAboutUsLink(language);

  if (!homeElements) {
    return <> </>;
  }

  if (!spinnerService.isShowing('apiSpinner')) {
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
        <div style={{
          'backgroundColor': 'silver',
          'padding': '.5em',
          'margin': '.5em'
        }}>
          <h2>Changes</h2>
          <ul>
            {changes.map(change =>
              <li key={change.codename + '-' + change.language}>
                {change.codename}({change.language},{change.collection}) - {change.change_type} {change.timestamp}
              </li>
            )}
          </ul>
        </div>
        {homeElements.heroUnit &&
          homeElements.heroUnit.linkedItems &&
          homeElements.heroUnit.linkedItems.length && (
            <Banner heroUnit={homeElements.heroUnit.linkedItems[0]} />
          )}
        {homeElements.articles && (
          <LatestArticles articles={homeElements.articles.linkedItems} />
        )}
        <LinkButton
          link={`/${language.toLowerCase()}/articles`}
          text={formatMessage({ id: 'Home.moreArticles' })}
        />
        {homeElements.ourStory &&
          homeElements.ourStory.linkedItems &&
          homeElements.ourStory.linkedItems.length && (
            <>
              <OurStory fact={homeElements.ourStory.linkedItems[0]} />
              <LinkButton
                link={`/${language.toLowerCase()}/${aboutUsLink}`}
                text={formatMessage({ id: 'Home.aboutLinkText' })}
              />
            </>
          )}
        {homeElements.cafes && homeElements.cafes.value && (
          <TasteOurCoffee cafes={homeElements.cafes.linkedItems} />
        )}
        <LinkButton
          link={`/${language.toLowerCase()}/cafes`}
          text={formatMessage({ id: 'Home.cafesLinkText' })}
        />
      </div>
    );
  }

  return <></>;
};

export default Home;
