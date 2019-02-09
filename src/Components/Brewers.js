import React, { Component } from 'react';

import Link from '../Components/LowerCaseUrlLink';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { BrewerStore } from '../Stores/Brewer';
import { translate } from 'react-translate';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      BrewerStore.provideBrewers(nextProps.language);
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
      let price =
        brewer.price.value !== null
          ? formatPrice(brewer.price.value, this.props.language)
          : this.props.t('noPriceValue');

      let name =
        brewer.productName.value.trim().length > 0
          ? brewer.productName.value
          : this.props.t('noNameValue');

      let imageLink =
        brewer.image.value[0] !== undefined ? (
          <img alt={name} src={brewer.image.value[0].url} title={name} />
        ) : (
          <div
            style={{ height: '257.15px' }}
            className="placeholder-tile-image"
          >
            {this.props.t('noTeaserValue')}
          </div>
        );

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
              <figure className="product-tile-image">{imageLink}</figure>
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

export default translate('Brewers')(Brewers);
