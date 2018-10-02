import React, { Component } from 'react';
import { AboutStore } from '../Stores/About';
import RichTextElement from '../Components/RichTextElement';
import Metadata from '../Components/Metadata';

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

  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      AboutStore.provideFacts(
        this.props.language,
        this.props.match.params.urlSlug
      );
      AboutStore.provideMetaData(
        this.props.language,
        this.props.match.params.urlSlug
      );
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let facts = this.state.facts.map((fact, index) => {
      let title = fact.title.value;
      let descriptionElement = fact.description;
      let imageLink = fact.image.value[0].url;

      if (index % 2 === 0) {
        return (
          <section className="row text-and-image" key={index}>
            <h2 className="col-lg-12">{title}</h2>
            <div className="col-md-6">
              <RichTextElement
                className="text-and-image-text"
                element={descriptionElement}
              />
            </div>
            <div className="col-md-6">
              <img
                alt={title}
                className="img-responsive"
                src={imageLink}
                title={title}
              />
            </div>
          </section>
        );
      }

      return (
        <section className="row text-and-image" key={index}>
          <h2 className="col-lg-12">{title}</h2>
          <div className="col-md-6 col-md-push-6">
            <RichTextElement
              className="text-and-image-text-right"
              element={descriptionElement}
            />
          </div>
          <div className="col-md-6 col-md-pull-6">
            <img
              alt={title}
              className="img-responsive"
              src={imageLink}
              title={title}
            />
          </div>
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

export default About;
