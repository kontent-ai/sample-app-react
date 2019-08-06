import React, { Component } from 'react';
import { AboutStore } from '../Stores/About';
import RichTextElement from '../Components/RichTextElement';
import Metadata from '../Components/Metadata';
import { translate } from 'react-translate';

let getState = props => {
  return {
    metaData: AboutStore.getMetaData(props.language),
    facts: AboutStore.getFacts(props.language)
  };
};

class About extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AboutStore.addChangeListener(this.onChange);
    AboutStore.provideFacts(
      this.props.language,
      this.props.match.params.urlSlug
    );
    AboutStore.provideMetaData(
      this.props.language,
      this.props.match.params.urlSlug
    );
  }

  componentWillUnmount() {
    AboutStore.removeChangeListener(this.onChange);
    AboutStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      AboutStore.provideFacts(
        nextProps.language,
        nextProps.match.params.urlSlug
      );
      AboutStore.provideMetaData(
        nextProps.language,
        nextProps.match.params.urlSlug
      );
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
    let facts =
      this.state.facts.value &&
      this.state.facts.value.map((fact, index) => {
        let title =
          fact.title.value.trim().length > 0
            ? fact.title.value
            : this.props.t('noTitleValue');

        let descriptionElement =
          fact.description.value !== '<p><br></p>' ? (
            <RichTextElement
              className="text-and-image-text"
              element={fact.description}
            />
          ) : (
            <p className="text-and-image-text">
              {this.props.t('noDescriptionValue')}
            </p>
          );

        let imageLink =
          fact.image.value[0] !== undefined ? (
            <img
              alt={title}
              className="img-responsive"
              src={fact.image.value[0].url}
              title={title}
            />
          ) : (
            <div className="img-responsive placeholder-tile-image">
              {this.props.t('noTeaserValue')}
            </div>
          );

        if (index % 2 === 0) {
          return (
            <section className="row text-and-image" key={index}>
              <h2 className="col-lg-12">{title}</h2>
              <div className="col-md-6">{descriptionElement}</div>
              <div className="col-md-6">{imageLink}</div>
            </section>
          );
        }

        return (
          <section className="row text-and-image" key={index}>
            <h2 className="col-lg-12">{title}</h2>
            <div className="col-md-6 col-md-push-6">{descriptionElement}</div>
            <div className="col-md-6 col-md-pull-6">{imageLink}</div>
          </section>
        );
      });

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
        {facts}
      </div>
    );
  }
}

export default translate('About')(About);
