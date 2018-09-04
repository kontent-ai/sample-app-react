import React, { Component } from 'react';

import Link from '../Components/LowerCaseUrlLink';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { BrewerStore } from '../Stores/Brewer';

let getState = props => {
  return {
    brewers: BrewerStore.getBrewers(props.language),
    filter: BrewerStore.getFilter()
  };
};

class Brewers extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BrewerStore.addChangeListener(this.onChange);
    BrewerStore.provideBrewers(this.props.language);
  }

  componentWillUnmount() {
    BrewerStore.removeChangeListener(this.onChange);
    BrewerStore.unsubscribe();
  }

  // Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      BrewerStore.provideBrewers(nextProps.language);
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let formatPrice = (price, language) => {
      return price.toLocaleString(language, {
        style: 'currency',
        currency: 'USD'
      });
    };

    let renderProductStatus = productStatus => {
      if (productStatus.value.length === 0) {
        return <span />;
      }

      let text = productStatus.value.map(x => x.name).join(', ');

      return <span className="product-tile-status">{text}</span>;
    };

    let filter = brewer => {
      return this.state.filter.matches(brewer);
    };

    let brewers = this.state.brewers.filter(filter).map((brewer, index) => {
      let price = formatPrice(brewer.price.value, this.props.language);
      let name = brewer.productName.value;
      let imageLink = brewer.image.value[0].url;
      let status = renderProductStatus(brewer.productStatus);
      let link = resolveContentLink(
        { type: 'brewer', urlSlug: brewer.urlPattern.value },
        this.props.language
      );

      return (
        <div className="col-md-6 col-lg-4" key={index}>
          <article className="product-tile">
            <Link to={link}>
              <h1 className="product-heading">{name}</h1>
              {status}
              <figure className="product-tile-image">
                <img alt={name} className="" src={imageLink} title={name} />
              </figure>
              <div className="product-tile-info">
                <span className="product-tile-price">{price}</span>
              </div>
            </Link>
          </article>
        </div>
      );
    });

    return (
      <div id="product-list" className="col-md-8 col-lg-9 product-list">
        {brewers}
      </div>
    );
  }
}

export default Brewers;
