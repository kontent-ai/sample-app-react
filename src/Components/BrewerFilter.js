import React, { Component } from 'react';
import { translate } from 'react-translate';

import { BrewerStore } from '../Stores/Brewer';

let priceRanges = [
  { min: 0, max: 50 },
  { min: 50, max: 250 },
  { min: 250, max: 5000 }
];

let getState = () => {
  return {
    filter: BrewerStore.getFilter(),
    manufacturers: BrewerStore.getManufacturers(),
    productStatuses: BrewerStore.getProductStatuses()
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
    BrewerStore.provideManufacturers();
    BrewerStore.provideProductStatuses();
  }

  componentWillUnmount() {
    BrewerStore.removeChangeListener(this.onChange);
    BrewerStore.unsubscribe();
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let filter = this.state.filter;
    let manufacturers = this.state.manufacturers;
    let productStatuses = this.state.productStatuses;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <h4>{this.props.t('manufacturerTitle')}</h4>
        <ManufacturerFilter manufacturers={manufacturers} filter={filter} />
        <h4>{this.props.t('priceTitle')}</h4>
        <PriceRangeFilter
          priceRanges={priceRanges}
          filter={filter}
          language={this.props.language}
        />
        <h4>{this.props.t('statusTitle')}</h4>
        <ProductStatusFilter
          productStatuses={productStatuses}
          filter={filter}
        />
      </aside>
    );
  }
}

const ManufacturerFilter = props => {
  let filterItems = props.manufacturers.map(manufacturer => {
    return (
      <ManufacturerFilterItem
        manufacturer={manufacturer}
        id={'Manufacturer-' + manufacturer.codename}
        filter={props.filter}
        key={manufacturer.codename}
      />
    );
  });

  return <div>{filterItems}</div>;
};

const ManufacturerFilterItem = props => {
  let codename = props.manufacturer.codename;
  let checked = props.filter.manufacturers.includes(codename);
  let onChange = () => {
    props.filter.toggleManufacturer(codename);
    BrewerStore.setFilter(props.filter);
  };

  return (
    <span className="checkbox js-postback">
      <input
        id={props.id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={props.id}>{props.manufacturer.name}</label>
    </span>
  );
};

const PriceRangeFilter = props => {
  let filterItems = props.priceRanges.map((priceRange, index) => {
    return (
      <PriceRangeFilterItem
        language={props.language}
        priceRange={priceRange}
        id={'PriceRange-' + index}
        filter={props.filter}
        key={index}
      />
    );
  });

  return <div>{filterItems}</div>;
};

const PriceRangeFilterItem = props => {
  let checked =
    props.filter.priceRanges.findIndex(
      x => x.min === props.priceRange.min && x.max === props.priceRange.max
    ) >= 0;
  let formatPrice = (price, language) => {
    return price.toLocaleString(language, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    });
  };
  let onChange = () => {
    props.filter.togglePriceRange(props.priceRange);
    BrewerStore.setFilter(props.filter);
  };
  return (
    <span className="checkbox js-postback">
      <input
        id={props.id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={props.id}>
        {formatPrice(props.priceRange.min, props.language) +
          ' – ' +
          formatPrice(props.priceRange.max, props.language)}
      </label>
    </span>
  );
};

const ProductStatusFilter = props => {
  let filterItems = props.productStatuses.map(productStatus => {
    return (
      <ProductStatusFilterItem
        productStatus={productStatus}
        id={'ProductStatus-' + productStatus.codename}
        filter={props.filter}
        key={productStatus.codename}
      />
    );
  });

  return <div>{filterItems}</div>;
};

const ProductStatusFilterItem = props => {
  let codename = props.productStatus.codename;
  let checked = props.filter.productStatuses.includes(codename);
  let onChange = () => {
    props.filter.toggleProductStatus(codename);
    BrewerStore.setFilter(props.filter);
  };

  return (
    <span className="checkbox js-postback">
      <input
        id={props.id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={props.id}>{props.productStatus.name}</label>
    </span>
  );
};

export default translate('BrewerFilter')(BrewerFilter);
