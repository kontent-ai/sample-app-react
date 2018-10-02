import React, { Component } from 'react';
import { translate } from 'react-translate';

import { CafeStore } from '../Stores/Cafe';

let getState = props => {
  return {
    companyCafes: CafeStore.getCompanyCafes(props.language),
    partnerCafes: CafeStore.getPartnerCafes(props.language)
  };
};

class Cafes extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CafeStore.addChangeListener(this.onChange);
    CafeStore.provideCompanyCafes(this.props.language);
    CafeStore.providePartnerCafes(this.props.language);
  }

  componentWillUnmount() {
    CafeStore.removeChangeListener(this.onChange);
    CafeStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      CafeStore.provideCompanyCafes(nextProps.language);
      CafeStore.providePartnerCafes(nextProps.language);
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
    let createModel = cafe => {
      let model = {
        name: cafe.system.name,
        imageLink: 'url(' + cafe.photo.value[0].url + ')',
        street: cafe.street.value,
        city: cafe.city.value,
        zipCode: cafe.zipCode.value,
        country: cafe.country.value,
        state: cafe.state.value,
        phone: cafe.phone.value
      };
      model.dataAddress = model.city + ', ' + model.street;
      model.countryWithState =
        model.country + (model.state ? ', ' + model.state : '');
      model.location = model.city + ', ' + model.countryWithState;

      return model;
    };

    let companyCafes = this.state.companyCafes
      .map(createModel)
      .map((model, index) => {
        return (
          <div className="col-md-6" key={index}>
            <div
              className="cafe-image-tile js-scroll-to-map"
              data-address={model.dataAddress}
            >
              <div
                className="cafe-image-tile-image-wrapper"
                style={{
                  backgroundImage: model.imageLink,
                  backgroundSize: 'cover',
                  backgroundPosition: 'right'
                }}
              />
              <div className="cafe-image-tile-content">
                <h3 className="cafe-image-tile-name">{model.name}</h3>
                <address className="cafe-tile-address">
                  <span name={model.name} className="cafe-tile-address-anchor">
                    {model.street}, {model.city}
                    <br />
                    {model.zipCode}, {model.countryWithState}
                  </span>
                </address>
                <p>{model.phone}</p>
              </div>
            </div>
          </div>
        );
      });

    let models = this.state.partnerCafes.map(createModel);
    let locations = models
      .map(model => model.location)
      .reduce((result, location) => {
        if (result.indexOf(location) < 0) {
          result.push(location);
        }

        return result;
      }, [])
      .sort();
    let partnerCafes = locations.map((location, locationIndex) => {
      let locationPartnerCafes = models
        .filter(model => model.location === location)
        .map((model, modelIndex) => {
          return (
            <p key={modelIndex}>
              {model.name}, {model.street}, {model.phone}
            </p>
          );
        });

      return (
        <div key={locationIndex}>
          <h3>{location}</h3>
          {locationPartnerCafes}
        </div>
      );
    });

    return (
      <div className="container">
        <h2>{this.props.t('ourCafesTitle')}</h2>
        <div className="row">{companyCafes}</div>
        <h2>{this.props.t('partnerCafesTitle')}</h2>
        <div className="row">{partnerCafes}</div>
      </div>
    );
  }
}

export default translate('Cafes')(Cafes);
