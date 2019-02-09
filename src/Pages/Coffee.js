import React, { Component } from 'react';
import { CoffeeStore } from '../Stores/Coffee';
import RichTextElement from '../Components/RichTextElement';
import Metadata from '../Components/Metadata';
import { translate } from 'react-translate';

let getState = props => {
  return {
    coffee: CoffeeStore.getCoffee(
      props.match.params.coffeeSlug,
      props.language
    ),
    match: { params: { coffeeSlug: props.match.params.coffeeSlug } }
  };
};

class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this.onChange);
    CoffeeStore.provideCoffee(this.props.language);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
    CoffeeStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.language !== nextProps.language ||
      prevState.match.params.coffeeSlug !== nextProps.match.params.coffeeSlug
    ) {
      CoffeeStore.provideCoffee(nextProps.language);
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
    if (!this.state.coffee) {
      return <div className="container" />;
    }

    let coffee = this.state.coffee;

    let name =
      coffee.productName.value.trim().length > 0
        ? coffee.productName.value
        : this.props.t('noNameValue');

    let imageLink =
      coffee.image.value[0] !== undefined ? (
        <img alt={name} src={coffee.image.value[0].url} title={name} />
      ) : (
        <div className="placeholder-tile-image">
          {this.props.t('noTeaserValue')}
        </div>
      );

    let descriptionElement =
      coffee.longDescription.value !== '<p><br></p>' ? (
        <RichTextElement element={coffee.longDescription} />
      ) : (
        <p>{this.props.t('noDescriptionValue')}</p>
      );

    let farm =
      coffee.farm.value.trim().length > 0 ? coffee.farm.value : '\u00A0';

    let variety =
      coffee.variety.value.trim().length > 0 ? coffee.variety.value : '\u00A0';

    let processing =
      coffee.processing.value.length > 0
        ? coffee.processing.value[0].name
        : '\u00A0';
    let altitude =
      coffee.altitude.value.trim().length > 0
        ? coffee.altitude.value + ' feet'
        : '\u00A0';

    return (
      <div className="container">
        <Metadata
          title={coffee.metadataMetaTitle}
          description={coffee.metadataMetaDescription}
          ogTitle={coffee.metadataOgTitle}
          ogImage={coffee.metadataOgImage}
          ogDescription={coffee.metadataOgDescription}
          twitterTitle={coffee.metadataMetaTitle}
          twitterSite={coffee.metadataTwitterSite}
          twitterCreator={coffee.metadataTwitterCreator}
          twitterDescription={coffee.metadataTwitterDescription}
          twitterImage={coffee.metadataTwitterImage}
        />
        <article className="product-detail">
          <div className="row">
            <div className="col-md-12">
              <header>
                <h2>{name}</h2>
              </header>
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-7 col-md-6">
              <figure className="image">{imageLink}</figure>
              <div className="description">
                {descriptionElement}
                <div className="product-detail-properties">
                  <h4>Parameters</h4>
                  <dl className="row">
                    <dt className="col-xs-12 col-sm-4">Farm</dt>
                    <dd className="col-xs-12 col-sm-8">{farm}</dd>
                    <dt className="col-xs-12 col-sm-4">Variety</dt>
                    <dd className="col-xs-12 col-sm-8">{variety}</dd>
                    <dt className="col-xs-12 col-sm-4">Processing</dt>
                    <dd className="col-xs-12 col-sm-8">{processing}</dd>
                    <dt className="col-xs-12 col-sm-4">Altitude</dt>
                    <dd className="col-xs-12 col-sm-8">{altitude}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default translate('Coffees')(Coffee);
