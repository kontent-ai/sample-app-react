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
    HomeStore.unsubscribe();
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
    const aboutUsLink = getAboutUsLink(this.props.language);

    return (
      <div className="container">
        <Metadata
          title={home.metadataMetaTitle}
          description={home.metadataMetaDescription}
          ogTitle={home.metadataOgTitle}
          ogImage={home.metadataOgImage}
          ogDescription={home.metadataOgDescription}
          twitterTitle={home.metadataMetaTitle}
          twitterSite={home.metadataTwitterSite}
          twitterCreator={home.metadataTwitterCreator}
          twitterDescription={home.metadataTwitterDescription}
          twitterImage={home.metadataTwitterImage}
        />
        {home.heroUnit &&
          home.heroUnit.value &&
          home.heroUnit.value.length && (
            <Banner heroUnit={home.heroUnit.value[0]} />
          )}
        {home.articles && (
          <LatestArticles
            articles={home.articles.value}
            language={this.props.language}
          />
        )}
        <LinkButton
          link={`/${this.props.language}/articles`}
          text={this.props.t('moreArticles')}
        />
        {home.ourStory &&
          home.ourStory.value &&
          home.ourStory.value.length && (
            <>
              <OurStory fact={home.ourStory.value[0]} />
              <LinkButton
                link={aboutUsLink}
                text={this.props.t('aboutLinkText')}
              />
            </>
          )}
        {home.cafes &&
          home.cafes.value && (
            <TasteOurCoffee
              cafes={home.cafes.value}
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
