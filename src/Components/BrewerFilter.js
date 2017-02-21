import React, { Component } from 'react';
import BrewerStore from "../Stores/Brewer";

let priceRanges = [
  { min: 0, max: 50 },
  { min: 50, max: 250 },
  { min: 250, max: 5000 },
];

let productStatuses = [
  "On sale",
  "Bestseller",
];

let getState = () => {
  return {
    filter: BrewerStore.getFilter(),
    manufacturers: BrewerStore.getBrewers().map((x) => x.elements.manufacturer.value).reduce((result, manufacturer) => {
      if (manufacturer && result.indexOf(manufacturer) < 0) {
        result.push(manufacturer);
      }

      return result;
    }, []).sort()
  };
};

class BrewerFilter extends Component {
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
    let filter = this.state.filter;
    let manufacturers = this.state.manufacturers;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <h4>Manufacturer</h4>
        <ManufacturerFilter manufacturers={manufacturers} filter={filter} />
        <h4>Price</h4>
        <PriceRangeFilter priceRanges={priceRanges} filter={filter} />
        <h4>Status</h4>
        <ProductStatusFilter productStatuses={productStatuses} filter={filter} />
      </aside>
    );
  }
}

const ManufacturerFilter = (props) => {
  let filterItems = props.manufacturers.map((manufacturer, index) => {
    return (
      <ManufacturerFilterItem manufacturer={manufacturer} id={"Manufacturer-" + index} filter={props.filter} key={index} />
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const ManufacturerFilterItem = (props) => {
  let checked = props.filter.manufacturers.indexOf(props.manufacturer) >= 0;
  let onChange = () => {
    props.filter.toggleManufacturer(props.manufacturer);
    BrewerStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={props.id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={props.id}>{props.manufacturer}</label>
    </span>
  );
}

const PriceRangeFilter = (props) => {
  let filterItems = props.priceRanges.map((priceRange, index) => {
    return (
      <PriceRangeFilterItem priceRange={priceRange} id={"PriceRange-" + index} filter={props.filter} key={index} />
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const PriceRangeFilterItem = (props) => {
  let checked = props.filter.priceRanges.findIndex((x) => x.min === props.priceRange.min && x.max === props.priceRange.max) >= 0;
  let formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    });
  };
  let onChange = () => {
    props.filter.togglePriceRange(props.priceRange);
    BrewerStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={props.id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={props.id}>{formatPrice(props.priceRange.min) + " – " + formatPrice(props.priceRange.max)}</label>
    </span>
  );
}

const ProductStatusFilter = (props) => {
  let filterItems = props.productStatuses.map((productStatus, index) => {
    return (
      <ProductStatusFilterItem productStatus={productStatus} id={"ProductStatus-" + index} filter={props.filter} key={index} />
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const ProductStatusFilterItem = (props) => {
  let checked = props.filter.productStatuses.indexOf(props.productStatus) >= 0;
  let onChange = () => {
    props.filter.toggleProductStatus(props.productStatus);
    BrewerStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={props.id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={props.id}>{props.productStatus}</label>
    </span>
  );
}

export default BrewerFilter;