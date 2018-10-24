import React, { Component } from 'react';
import { translate } from 'react-translate';

import { CafeStore } from '../Stores/Cafe';
import ContactMap from '../Components/ContactMap';

let getState = language => {
  return {
    cafes: CafeStore.getCompanyCafes(language)
  };
};

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props.language);
    this.onChange = this.onChange.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
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
        language: nextProps.language,
        selectedAddress: undefined
      };
    }
    return null;
  }

  onChange(language) {
    this.setState(getState(language || this.props.language));
  }

  selectAddress(address) {
    this.setState({
      selectedAddress: address
    });
  }

  render() {
    let createModel = cafe => {
      let model = {
        name: cafe.system.name,
        street: cafe.street.value,
        city: cafe.city.value,
        zipCode: cafe.zipCode.value,
        country: cafe.country.value,
        state: cafe.state.value,
        phone: cafe.phone.value,
        email: cafe.email.value
      };
      model.dataAddress = model.city + ', ' + model.street;
      model.countryWithState =
        model.country + (model.state ? ', ' + model.state : '');
      return model;
    };

    let roastery = this.state.cafes.map(createModel).map(model => {
      return (
        <div className="col-md-12">
          <h2 className="contact-title">{this.props.t('roasteryTitle')}</h2>
          <ul className="contact-info">
            <li>{model.phone}</li>
            <li>
              <a href={'mailto:' + model.email} target="_top">
                {model.email}
              </a>
            </li>
            <li>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  this.selectAddress(model.dataAddress);
                }}
                data-address={model.dataAddress}
                className="js-scroll-to-map"
              >
                {model.dataAddress},<br />
                {model.zipCode}, {model.countryWithState}
                <br />
              </a>
            </li>
          </ul>
        </div>
      );
    })[0];

    let cafes = this.state.cafes.map(createModel).map((model, index) => {
      return (
        <div className="col-md-6 col-lg-3" key={index}>
          <div
            onClick={() => this.selectAddress(model.dataAddress)}
            className="cafe-tile cursor-hand js-scroll-to-map"
            data-address={model.dataAddress}
          >
            <div className="cafe-tile-content">
              <h3 className="cafe-tile-name">{model.name}</h3>
              <address className="cafe-tile-address">
                <a
                  href="/#"
                  name={model.name}
                  className="cafe-tile-address-anchor"
                  onClick={e => e.preventDefault()}
                >
                  {model.street}, {model.city}
                  <br />
                  {model.zipCode}, {model.countryWithState}
                </a>
              </address>
              <p>{model.phone}</p>
            </div>
          </div>
        </div>
      );
    });

    let cafesAddresses = this.state.cafes.map(cafe => {
      return `${cafe.city.value}, ${cafe.street.value}`;
    });

    return (
      <div className="container">
        {roastery}
        <div>
          <h2>{this.props.t('ourCafesTitle')}</h2>
          <div className="row">{cafes}</div>
        </div>
        <h2 className="map-title">{this.props.t('mapTitle')}</h2>
        <ContactMap
          cafesAddresses={cafesAddresses}
          focusOnAddress={this.state.selectedAddress}
        />
      </div>
    );
  }
}

export default translate('Contacts')(Contacts);
