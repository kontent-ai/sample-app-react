import React, { Component } from 'react';
import CoffeeStore from "../Stores/Coffee";

let processings = [
    "Washed",
    "Semi-washed",
    "Natural",
];

let getState = () => {
    return {
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
    }

    componentWillUnmount() {
        CoffeeStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    render() {
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
            <ProcessingFilterItem processing={processing} id={"Processing-" + index} filter={props.filter} key={index} />
        );
    });

    return (
        <div>
            {filterItems}
        </div>
    );
}

const ProcessingFilterItem = (props) => {
    let checked = props.filter.processings.indexOf(props.processing) >= 0;
    let onChange = () => {
        props.filter.toggleProcessing(props.processing);
        CoffeeStore.setFilter(props.filter);
    }

    return (
        <span className="checkbox js-postback">
            <input id={props.id} type="checkbox" checked={checked} onChange={onChange} />
            <label htmlFor={props.id}>{props.processing}</label>
        </span>
    );
}

export default CoffeeFilter;