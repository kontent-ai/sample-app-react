import React, { Component } from 'react';
import { Link } from 'react-router';
import CafeStore from '../Stores/Cafe';

let getState = () => {
  return {
    cafes: CafeStore.getCompanyCafes()
  };
};

class TasteOurCoffee extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CafeStore.addChangeListener(this.onChange);
    CafeStore.provideCompanyCafes();
  }

  componentWillUnmount() {
    CafeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let cafes = this.state.cafes.map((cafe, index) => {
      let name = cafe.system.name;
      let imageLink = cafe.elements.photo.value[0].url;

      return (
        <div className="col-xs-6 col-md-3" key={index}>
          <div>
            <Link to="/cafes" className="ourcoffee-tile-link">
              <h2 className="ourcoffee-tile-text center-text">{name}</h2>
              <span className="cafe-overlay"> </span>
              <img alt={name} className="ourcoffee-tile-image" src={imageLink} title={name} />
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div>
          <h1 className="title-tab">Taste Our Coffee</h1>
        </div>
        {cafes}
      </div>
    );
  }
}

export default TasteOurCoffee;