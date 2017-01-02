import React, { Component } from 'react';
import CafeStore from "../Stores/Cafe";
import Map from "../Components/Map";
import Marker from "../Components/Marker";

let getState = () => {
    return {
        cafes: CafeStore.getCompanyCafes()
    };
};

class Contacts extends Component
{
    constructor(props)
    {
        super(props);
        this.state = getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount()
    {
        CafeStore.addChangeListener(this.onChange);
        CafeStore.provideCompanyCafes();
    }

    componentWillUnmount()
    {
        CafeStore.removeChangeListener(this.onChange);
    }

    onChange()
    {
        this.setState(getState());
    }

    render()
    {
        let createModel = (cafe) => {
            let model = {
                name: cafe.system.name,
                street: cafe.elements.street.value,
                city: cafe.elements.city.value,
                zipCode: cafe.elements.zip_code.value,
                country: cafe.elements.country.value,
                state: cafe.elements.state.value,
                phone: cafe.elements.phone.value,
                email: cafe.elements.email.value,
            };
            model.dataAddress = model.city + ", " + model.street;
            model.countryWithState = model.country + (model.state ? ", " + model.state : "");
            return model;
        };

        let roastery = this.state.cafes.map(createModel).map((model) => {
            return(
                <div className="col-md-12">
                    <h2 className="contact-title">Roastery</h2>
                    <ul className="contact-info">
                        <li>{model.phone}</li>
                        <li><a href={"mailto:" + model.email} target="_top">{model.email}</a></li>
                        <li>
                            <a href='javascript:void(0)' data-address={model.dataAddress} className="js-scroll-to-map">{model.dataAddress},<br />
                                {model.zipCode}, {model.countryWithState}<br />
                            </a>
                        </li>
                    </ul>
                </div>
            );
        })[0];

        let cafes = this.state.cafes.map(createModel).map((model, index) => {
            return (<div className="col-md-6 col-lg-3" key={index}>
                    <div className="cafe-tile cursor-hand js-scroll-to-map" data-address={model.dataAddress}>
                        <div className="cafe-tile-content">
                            <h3 className="cafe-tile-name">{model.name}</h3>
                            <address className="cafe-tile-address">
                                <a href='javascript:void(0)' name={model.name} className="cafe-tile-address-anchor">
                                    {model.street}, {model.city}<br />{model.zipCode}, {model.countryWithState}
                                </a>
                            </address>
                            <p>{model.phone}</p>
                        </div>
                    </div>
                </div>)
        });

        let markers = this.state.cafes.map(createModel).map((model, index) => {
            return(<Marker key={index} map={this.refs.map} address={model.dataAddress}/>);
        });

        return (
            <div className="container">
                {roastery}
                <div>
                    <h2>Our cafes</h2>
                    <div className="row">{cafes}</div>
                </div>
                <h2 className="map-title">Drop in</h2>
                <Map ref="map">
                    {markers}
                </Map>
            </div>);
    }
}

export default Contacts;