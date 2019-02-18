import React, { Component } from 'react';
import Link from '../Components/LowerCaseUrlLink';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { CoffeeStore } from '../Stores/Coffee';
import { translate } from 'react-translate';

let getState = props => {
  return {
    coffees: CoffeeStore.getCoffees(props.language),
    filter: CoffeeStore.getFilter()
  };
};

class Coffees extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this.onChange);
    CoffeeStore.provideCoffees(this.props.language);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
    CoffeeStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      CoffeeStore.provideCoffees(nextProps.language);
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

    let filter = coffee => {
      return this.state.filter.matches(coffee);
    };

    let coffees = this.state.coffees.filter(filter).map((coffee, index) => {
      let price =
        coffee.price.value !== null
          ? formatPrice(coffee.price.value, this.props.language)
          : this.props.t('noPriceValue');

      let name =
        coffee.productName.value.trim().length > 0
          ? coffee.productName.value
          : this.props.t('noNameValue');

      let imageLink =
        coffee.image.value[0] !== undefined ? (
          <img
            alt={name}
            className=""
            src={coffee.image.value[0].url}
            title={name}
          />
        ) : (
          <div
            style={{ height: '257.15px' }}
            className="product-tile-image placeholder-tile-image"
          >
            {this.props.t('noTeaserValue')}
          </div>
        );

      let status = renderProductStatus(coffee.productStatus);
      let link = resolveContentLink(
        { type: 'coffee', urlSlug: coffee.urlPattern.value },
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
        {coffees}
      </div>
    );
  }
}

export default translate('Coffees')(Coffees);
