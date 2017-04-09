import React, { Component } from 'react';
import CoffeeStore from "../Stores/Coffee";

let getState = () => {
  return {
    processings: CoffeeStore.getProcessings(),
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
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let processings = this.state.processings;
    let filter = this.state.filter;

    return (
      <aside className="col-md-4 col-lg-3 product-filter">
        <h4>Coffee processing</h4>
        <ProcessingFilter processings={processings} filter={filter} />
      </aside>
    );
  }
}

const ProcessingFilter = (props) => {
  let filterItems = props.processings.map((processing, index) => {
    return (
      <ProcessingFilterItem processing={processing} filter={props.filter} key={index} />
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
  let checked = props.filter.processings.indexOf(codename) >= 0;
  let onChange = () => {
    props.filter.toggleProcessing(codename);
    CoffeeStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={codename}>{props.processing.name}</label>
    </span>
  );
}

export default CoffeeFilter;