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
    metaData: HomeStore.getMetaData(props.language)
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
    HomeStore.provideMetaData(this.props.language);
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this.onChange);
    HomeStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      HomeStore.provideMetaData(nextProps.language);
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
    let metaData = this.state.metaData;

    return (
      <div className="container">
        <Metadata
          title={metaData.metadataMetaTitle}
          description={metaData.metadataMetaDescription}
          ogTitle={metaData.metadataOgTitle}
          ogImage={metaData.metadataOgImage}
          ogDescription={metaData.metadataOgDescription}
          twitterTitle={metaData.metadataMetaTitle}
          twitterSite={metaData.metadataTwitterSite}
          twitterCreator={metaData.metadataTwitterCreator}
          twitterDescription={metaData.metadataTwitterDescription}
          twitterImage={metaData.metadataTwitterImage}
        />
        <Banner />
        <LatestArticles language={this.props.language} />
        <LinkButton
          link={`/${this.props.language}/articles`}
          text={this.props.t('moreArticles')}
        />
        <OurStory />
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
        <TasteOurCoffee language={this.props.language} />
        <LinkButton
          link={`/${this.props.language}/cafes`}
          text={this.props.t('cafesLinkText')}
        />
      </div>
    );
  }
}

export default translate('Home')(Home);
