import React, { Component } from 'react';
import CoffeeStore from "../Stores/Coffee";

let getState = (props) => {
  return {
    coffee: CoffeeStore.getCoffee(props.params.coffeeCodename)
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
    CoffeeStore.provideCoffee(this.props.params.coffeeId);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    if (!this.state.coffee) {
      return (
        <div className="container"></div>
      );
    }

    let e = this.state.coffee.elements;
    let name = e.product_name.value;
    let imageLink = e.image.value[0].url;
    let description = e.long_description.value;
    let farm = e.farm.value;
    let variety = e.variety.value;
    let processing = e.processing.value;
    let altitude = e.altitude.value + " feet";

    return (
      <div className="container">
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
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
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