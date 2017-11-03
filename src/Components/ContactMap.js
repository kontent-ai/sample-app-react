import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Immutable from 'immutable';


export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            markerLocations: Immutable.List([]),
            reloadRequired: true
        }

        this.pushMarkerLocations = this.pushMarkerLocations.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.loaded){
            if(this.state.reloadRequired || this.props.cafesAddresses !== nextProps.cafesAddresses){                
                let geocoder = new window.google.maps.Geocoder();
                nextProps.cafesAddresses.forEach(address => {
                    geocoder.geocode({ 'address': address }, this.pushMarkerLocations)
                })
                this.setState({
                    reloadRequired: false
                });
            }
        }      
    }

    pushMarkerLocations = (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
            this.setState((previousState) => ({
                markerLocations: previousState.markerLocations.push(results[0].geometry.location)
            }))
        } else {
            console.warn('Geocode was not successful for the following reason: ' + status);
        }
    }

    render() {
        const style = {
            position: 'relative',
            width: '100%',
            height: '400px'
        }

        let markers = this.state.markerLocations.map((location, index) => {
            return <Marker
                position={location}
                key={index} />
        })

        return (
            <Map
                className="map"
                style={style}
                google={this.props.google}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                zoom={4}
                clickableIcons={false}>
                {markers}
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAVOq4C-rf7JVeHt6ws9vsf-KHIRpueASg'
})(MapContainer)