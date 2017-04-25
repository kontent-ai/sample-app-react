import React, { Component } from 'react';
import CafeStore from '../Stores/Cafe';

let getState = () => {
  return {
    companyCafes: CafeStore.getCompanyCafes(),
    partnerCafes: CafeStore.getPartnerCafes()
  };
};

class Cafes extends Component {

  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CafeStore.addChangeListener(this.onChange);
    CafeStore.provideCompanyCafes();
    CafeStore.providePartnerCafes();
  }

  componentWillUnmount() {
    CafeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let createModel = (cafe) => {
      let model = {
        name: cafe.system.name,
        imageLink: "url(" + cafe.elements.photo.value[0].url + ")",
        street: cafe.elements.street.value,
        city: cafe.elements.city.value,
        zipCode: cafe.elements.zip_code.value,
        country: cafe.elements.country.value,
        state: cafe.elements.state.value,
        phone: cafe.elements.phone.value,
      };
      model.dataAddress = model.city + ", " + model.street;
      model.countryWithState = model.country + (model.state ? ", " + model.state : "");
      model.location = model.city + ", " + model.countryWithState;

      return model;
    };

    let companyCafes = this.state.companyCafes.map(createModel).map((model, index) => {
      return (
        <div className="col-md-6" key={index}>
          <div className="cafe-image-tile js-scroll-to-map" data-address={model.dataAddress}>
            <div className="cafe-image-tile-image-wrapper" style={{ backgroundImage: model.imageLink, backgroundSize: "cover", backgroundPosition: "right" }}>
            </div>
            <div className="cafe-image-tile-content">
              <h3 className="cafe-image-tile-name">{model.name}</h3>
              <address className="cafe-tile-address">
                <a name={model.name} className="cafe-tile-address-anchor">
                  {model.street}, {model.city}<br />{model.zipCode}, {model.countryWithState}
                </a>
              </address>
              <p>{model.phone}</p>
            </div>
          </div>
        </div>
      );
    });

    let models = this.state.partnerCafes.map(createModel);
    let locations = models.map((model) => model.location).reduce((result, location) => {
      if (result.indexOf(location) < 0) {
        result.push(location);
      }

      return result;
    }, []).sort();
    let partnerCafes = locations.map((location, locationIndex) => {
      let locationPartnerCafes = models.filter((model) => model.location === location).map((model, modelIndex) => {
        return (
          <p key={modelIndex}>{model.name}, {model.street}, {model.phone}</p>
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
        <h2>Our cafes</h2>
        <div className="row">
          {companyCafes}
        </div>
        <h2>Other places where you can drink our coffee</h2>
        <div className="row">
          {partnerCafes}
        </div>
      </div>
    );
  }
}

export default Cafes;