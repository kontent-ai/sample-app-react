import React, { Component } from 'react';
import { Link } from 'react-router'
import CoffeeStore from "../Stores/Coffee";

let getState = () => {
  return {
    coffees: CoffeeStore.getCoffees(),
    filter: CoffeeStore.getFilter()
  };
};

class Coffees extends Component {

  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this.onChange);
    CoffeeStore.provideCoffees();
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let formatPrice = (price) => {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    };

    let renderProductStatus = (productStatus) => {
      if (productStatus.value.length === 0) {
        return <span />
      }

      let text = productStatus.value.map((x) => x.name).join(", ");

      return (
        <span className="product-tile-status">
          {text}
        </span>
      );
    };

    let filter = (coffee) => {
      return this.state.filter.matches(coffee);
    };

    let coffees = this.state.coffees.filter(filter).map((coffee, index) => {
      let e = coffee.elements;
      let price = formatPrice(e.price.value);
      let name = e.product_name.value;
      let imageLink = e.image.value[0].url;
      let status = renderProductStatus(e.product_status);
      let link = "store/coffees/" + coffee.elements.url_pattern.value;

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
                <span className="product-tile-price">
                  {price}
                </span>
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