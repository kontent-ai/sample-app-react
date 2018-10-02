import React, { Component } from 'react';
import { translate } from 'react-translate';

import { CoffeeStore } from '../Stores/Coffee';

let getState = () => {
  return {
    processings: CoffeeStore.getProcessings(),
    productStatuses: CoffeeStore.getProductStatuses(),
    filter: CoffeeStore.getFilter()
  };
};

class CoffeeFilter extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this.onChange);
    CoffeeStore.provideProcessings();
    CoffeeStore.provideProductStatuses();
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
    CoffeeStore.unsubscribe();
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let processings = this.state.processings;
    let productStatuses = this.state.productStatuses;
    let filter = this.state.filter;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <h4>{this.props.t('coffeeProcessingTitle')}</h4>
        <ProcessingFilter processings={processings} filter={filter} />
        <h4>{this.props.t('statusTitle')}</h4>
        <ProductStatusFilter
          productStatuses={productStatuses}
          filter={filter}
        />
      </aside>
    );
  }
}

const ProcessingFilter = props => {
  let filterItems = props.processings.map(processing => {
    return (
      <ProcessingFilterItem
        processing={processing}
        filter={props.filter}
        key={processing.codename}
      />
    );
  });

  return <div>{filterItems}</div>;
};

const ProcessingFilterItem = props => {
  let codename = props.processing.codename;
  let checked = props.filter.processings.includes(codename);
  let onChange = () => {
    props.filter.toggleProcessing(codename);
    CoffeeStore.setFilter(props.filter);
  };

  return (
    <span className="checkbox js-postback">
      <input
        id={codename}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={codename}>{props.processing.name}</label>
    </span>
  );
};

const ProductStatusFilter = props => {
  let filterItems = props.productStatuses.map(productStatus => {
    return (
      <ProductStatusFilterItem
        productStatus={productStatus}
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
    CoffeeStore.setFilter(props.filter);
  };

  return (
    <span className="checkbox js-postback">
      <input
        id={codename}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={codename}>{props.productStatus.name}</label>
    </span>
  );
};

export default translate('CoffeeFilter')(CoffeeFilter);
