import React, { Component } from 'react';
import { Link } from 'react-router'
import BrewerStore from "../Stores/Brewer";

let getState = () => {
  return {
    brewers: BrewerStore.getBrewers(),
    filter: BrewerStore.getFilter()
  };
};

class Brewers extends Component {

  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BrewerStore.addChangeListener(this.onChange);
    BrewerStore.provideBrewers();
  }

  componentWillUnmount() {
    BrewerStore.removeChangeListener(this.onChange);
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

    let filter = (brewer) => {
      return this.state.filter.matches(brewer);
    };

    let brewers = this.state.brewers.filter(filter).map((brewer, index) => {
      let e = brewer.elements;
      let price = formatPrice(e.price.value);
      let name = e.product_name.value;
      let imageLink = e.image.value[0].url;
      let status = renderProductStatus(e.product_status);
      let link = "store/brewers/" + brewer.elements.url_pattern.value;

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
        {brewers}
      </div>
    );
  }
}

export default Brewers;