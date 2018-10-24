import React, { Component } from 'react';
import { translate } from 'react-translate';

import Link from '../Components/LowerCaseUrlLink';
import { CafeStore } from '../Stores/Cafe';

let getState = props => {
  return {
    cafes: CafeStore.getCompanyCafes(props.language)
  };
};

class TasteOurCoffee extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CafeStore.addChangeListener(this.onChange);
    CafeStore.provideCompanyCafes(this.props.language);
  }

  componentWillUnmount() {
    CafeStore.removeChangeListener(this.onChange);
    CafeStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      CafeStore.provideCompanyCafes(nextProps.language);
      return {
        language: nextProps.language
      };
    }
    return null;
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let cafes = this.state.cafes.map((cafe, index) => {
      let name = cafe.system.name;
      let imageLink = cafe.photo.value[0].url;

      return (
        <div className="col-xs-6 col-md-3" key={index}>
          <div>
            <Link
              to={`/${this.props.language}/cafes`}
              className="ourcoffee-tile-link"
            >
              <h2 className="ourcoffee-tile-text center-text">{name}</h2>
              <span className="cafe-overlay"> </span>
              <img
                alt={name}
                className="ourcoffee-tile-image"
                src={imageLink}
                title={name}
              />
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div>
          <h1 className="title-tab">{this.props.t('title')}</h1>
        </div>
        {cafes}
      </div>
    );
  }
}

export default translate('TasteOurCoffee')(TasteOurCoffee);
