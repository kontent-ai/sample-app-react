import React, { Component } from 'react';
import CoffeeStore from "../Stores/Coffee";

let getState = () => {
  return {
    processings: CoffeeStore.getProcessings(),
    statuses: CoffeeStore.getProductStatuses(),
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
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let processings = this.state.processings;
    let statuses = this.state.statuses;
    let filter = this.state.filter;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <h4>Coffee processing</h4>
        <ProcessingFilter processings={processings} filter={filter}/>
        <h4>Status</h4>
        <ProductStatusFilter statuses={statuses} filter={filter}/>
      </aside>
    );
  }
}

const ProcessingFilter = (props) => {
  let filterItems = props.processings.map((processing) => {
    return (
      <ProcessingFilterItem processing={processing} filter={props.filter} key={processing.codename}/>
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const ProcessingFilterItem = (props) => {
  let codename = props.processing.codename;
  let checked = props.filter.processings.includes(codename);
  let onChange = () => {
    props.filter.toggleProcessing(codename);
    CoffeeStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
      <label htmlFor={codename}>{props.processing.name}</label>
    </span>
  );
}

const ProductStatusFilter = (props) => {
  let filterItems = props.statuses.map((status) => {
    return (
      <ProductStatusFilterItem status={status} filter={props.filter} key={status.codename}/>
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const ProductStatusFilterItem = (props) => {
  let codename = props.status.codename;
  let checked = props.filter.productStatuses.includes(codename);
  let onChange = () => {
    props.filter.toggleProductStatus(codename);
    CoffeeStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
      <label htmlFor={codename}>{props.status.name}</label>
    </span>
  );
}

export default CoffeeFilter;
