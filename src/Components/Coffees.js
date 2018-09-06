import React, { Component } from 'react';
import Link from '../Components/LowerCaseUrlLink';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { CoffeeStore } from '../Stores/Coffee';

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

  // Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      CoffeeStore.provideCoffees(nextProps.language);
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

    let filter = coffee => {
      return this.state.filter.matches(coffee);
    };

    let coffees = this.state.coffees.filter(filter).map((coffee, index) => {
      let price = formatPrice(coffee.price.value, this.props.language);
      let name = coffee.productName.value;
      let imageLink = coffee.image.value[0].url;
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
        {coffees}
      </div>
    );
  }
}

export default Coffees;
