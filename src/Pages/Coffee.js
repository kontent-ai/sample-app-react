import React, { Component } from 'react';
import { CoffeeStore } from '../Stores/Coffee';
import RichTextElement from '../Components/RichTextElement';
import Metadata from '../Components/Metadata';

let getState = props => {
  return {
    coffee: CoffeeStore.getCoffee(props.match.params.coffeeSlug, props.language)
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

  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.language !== nextProps.language ||
      this.props.match.params.coffeeSlug !== nextProps.match.params.coffeeSlug
    ) {
      CoffeeStore.provideCoffee(nextProps.language);
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    if (!this.state.coffee) {
      return <div className="container" />;
    }

    let coffee = this.state.coffee;
    let name = coffee.productName.value;
    let imageLink = coffee.image.value[0].url;
    let descriptionElement = coffee.longDescription;
    let farm = coffee.farm.value;
    let variety = coffee.variety.value;
    let processing =
      coffee.processing.value.length > 0 ? coffee.processing.value[0].name : '';
    let altitude = coffee.altitude.value + ' feet';

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
              <figure className="image">
                <img alt={name} className="" src={imageLink} title={name} />
              </figure>
              <div className="description">
                <RichTextElement element={descriptionElement} />
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

export default Coffee;
