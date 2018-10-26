import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Immutable from 'immutable';
import _ from 'lodash';
import Scroll from 'react-scroll';

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      markerLocations: Immutable.List([]),
      locationsCache: Immutable.Map({}),
      reloadRequired: true,
      scrollTo: undefined
    };

    this.reloadMarkers = this.reloadMarkers.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.pushMarkerLocation = this.pushMarkerLocation.bind(this);
    this.focusOnAddress = this.focusOnAddress.bind(this);
    this.translateAddressAndFocus = this.translateAddressAndFocus.bind(this);
    this.focusOnLocation = this.focusOnLocation.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loaded) {
      return;
    }

    if (
      this.state.reloadRequired ||
      !_.isEqual(this.props.cafesAddresses, prevProps.cafesAddresses)
    ) {
      this.reloadMarkers(this.props.cafesAddresses);
    }

    if (prevProps.focusOnAddress !== this.props.focusOnAddress) {
      this.focusOnAddress(this.props.focusOnAddress);
    }
  }

  reloadMarkers(cafesAddresses) {
    cafesAddresses.forEach(this.addMarker);
    this.setState({
      reloadRequired: false
    });
  }

  addMarker(address) {
    let addressLocation = this.state.locationsCache.get(address);
    if (addressLocation) {
      this.setState(previousState => ({
        markerLocations: previousState.markerLocations.push(addressLocation)
      }));
    } else {
      let geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: address },
        this.pushMarkerLocation.bind(this, address)
      );
    }
  }

  pushMarkerLocation(inputAddress, results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      let location = results[0].geometry.location;
      this.setState(previousState => ({
        markerLocations: previousState.markerLocations.push(location),
        locationsCache: previousState.locationsCache.set(inputAddress, location)
      }));
    } else {
      console.warn(
        'Geocode was not successful for the following reason: ' + status
      );
    }
  }

  focusOnAddress(address) {
    if (address) {
      let addressLocation = this.state.locationsCache.get(address);
      if (addressLocation) {
        this.focusOnLocation(addressLocation);
      } else {
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: address },
          this.translateAddressAndFocus.bind(this, address)
        );
      }
    } else if (address === undefined && this.state.scrollTo !== undefined) {
      this.setState({
        scrollTo: undefined
      });
    }
  }

  translateAddressAndFocus(inputAddress, results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      let location = results[0].geometry.location;
      this.setState({
        locationsCache: this.state.locationsCache.set(inputAddress, location)
      });
      this.focusOnLocation(location);
    } else {
      console.warn(
        'Geocode was not successful for the following reason: ' + status
      );
    }
  }

  focusOnLocation(location) {
    this.setState({
      scrollTo: location
    });
  }

  render() {
    const style = {
      position: 'relative',
      width: '100%',
      height: '400px'
    };

    let markers = this.state.markerLocations.map((location, index) => {
      return <Marker position={location} key={index} />;
    });

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
        clickableIcons={false}
      >
        {markers}
        <MapScroller scrollTo={this.state.scrollTo} />
      </Map>
    );
  }
}

class MapScroller extends Component {
  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.map && nextProps.scrollTo) {
      let scrollAnchor = ReactDOM.findDOMNode(this);
      Scroll.animateScroll.scrollTo(scrollAnchor.offsetTop);
      nextProps.map.panTo(nextProps.scrollTo);
      nextProps.map.setZoom(17);
    }
  }
  render() {
    return <span style={{ width: '0px', height: '0px' }} />;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAVOq4C-rf7JVeHt6ws9vsf-KHIRpueASg'
})(MapContainer);
