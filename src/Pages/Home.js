import React, { Component } from 'react';
import { translate } from 'react-translate';

import { HomeStore } from '../Stores/Home';
import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';
import Metadata from '../Components/Metadata';

import { englishCode, spanishCode } from '../Utilities/LanguageCodes';

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
    let home = this.state.home;

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
          home.heroUnit.length && <Banner heroUnit={home.heroUnit[0]} />}
        {home.articles && (
          <LatestArticles
            articles={home.articles}
            language={this.props.language}
          />
        )}
        <LinkButton
          link={`/${this.props.language}/articles`}
          text={this.props.t('moreArticles')}
        />
        {home.ourStory &&
          home.ourStory.length && <OurStory fact={home.ourStory[0]} />}
        {this.props.language &&
        this.props.language.toLowerCase() === englishCode.toLowerCase() ? (
          <LinkButton
            link={`/${this.props.language}/about-us`}
            text={this.props.t('aboutLinkText')}
          />
        ) : this.props.language &&
        this.props.language.toLowerCase() === spanishCode.toLowerCase() ? (
          <LinkButton
            link={`/${this.props.language}/acerca-de`}
            text={this.props.t('aboutLinkText')}
          />
        ) : null}
        {home.cafes && (
          <TasteOurCoffee cafes={home.cafes} language={this.props.language} />
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
