import React, { Component } from 'react';
import { translate } from 'react-translate';

import { HomeStore } from '../Stores/Home';
import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';
import Metadata from '../Components/Metadata';
import { getAboutUsLink } from '../Utilities/ContentLinks';

let getState = props => {
  return {
    home: HomeStore.getHome(props.language)
  };
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this.onChange);
    HomeStore.provideHome(this.props.language);
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this.onChange);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      HomeStore.provideHome(nextProps.language);
      return {
        language: nextProps.language
      };
    }
    return null;
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    const home = this.state.home;
    const homeElements = home.elements || {};
    const aboutUsLink = getAboutUsLink(this.props.language);

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
            language={this.props.language}
          />
        )}
        <LinkButton
          link={`/${this.props.language}/articles`}
          text={this.props.t('moreArticles')}
        />
        {homeElements.ourStory &&
          homeElements.ourStory.linkedItems &&
          homeElements.ourStory.linkedItems.length && (
            <>
              <OurStory fact={homeElements.ourStory.linkedItems[0]} />
              <LinkButton
                link={aboutUsLink}
                text={this.props.t('aboutLinkText')}
              />
            </>
          )}
        {homeElements.cafes &&
          homeElements.cafes.value && (
            <TasteOurCoffee
              cafes={homeElements.cafes.linkedItems}
              language={this.props.language}
            />
          )}
        <LinkButton
          link={`/${this.props.language}/cafes`}
          text={this.props.t('cafesLinkText')}
        />
      </div>
    );
  }
}

export default translate('Home')(Home);
