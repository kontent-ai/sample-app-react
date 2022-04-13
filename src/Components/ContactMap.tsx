import React, { Component, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, GoogleApiWrapper } from 'google-map-react';
import Immutable from 'immutable';
import _ from 'lodash';
import Scroll from 'react-scroll';

interface MapContainerProps {
  cafesAddresses: string[],
  focusOnAddress: any,
}

export const  MapContainer: React.FC<MapContainerProps> = (props) => {
  const [markerLocations, setMarkerLocations] = useState(Immutable.List([]));
  const [locationsCache, setLocationsCache] = useState(Immutable.Map({}));
  const [reloadRequired, setReloadRequired] = useState(true);
  const [scrollTo, setScrollTo] = useState<any>(undefined);
  const prevProps = useRef({ cafesAddresses: props.cafesAddresses, focusOnAddress: props.focusOnAddress }).current;

  useEffect(() => {
    if (
      reloadRequired ||
      !_.isEqual(props.cafesAddresses, prevProps.cafesAddresses)
    ) {
      reloadMarkers(props.cafesAddresses);
    }

    if (prevProps.focusOnAddress !== props.focusOnAddress) {
      focusOnAddress(props.focusOnAddress);
    }
  }, [props.focusOnAddress, props.cafesAddresses]);


  const reloadMarkers = (cafesAddresses: string[]) => {
    cafesAddresses.forEach(addMarker);
    setReloadRequired(false);
  }

  const addMarker = (address: string) => {
    let addressLocation = locationsCache.get(address);
    if (addressLocation) {
      setMarkerLocations(markerLocations.push(addressLocation));
    } else {
      let geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode(
        { address: address },
        pushMarkerLocation.bind(this, address)
      );
    }
  }

  const pushMarkerLocation = (inputAddress:any , results:any , status:any) => {
    if (status === (window as any).google.maps.GeocoderStatus.OK) {
      let location = results[0].geometry.location;
      setMarkerLocations(markerLocations.push(location));
      setLocationsCache(locationsCache.set(inputAddress, location));
    } else {
      console.warn(
        'Geocode was not successful for the following reason: ' + status
      );
    }
  }

  const focusOnAddress = (address :any) => {
    if (address) {
      let addressLocation = locationsCache.get(address);
      if (addressLocation) {
        focusOnLocation(addressLocation);
      } else {
        let geocoder = new (window as any).google.maps.Geocoder();
        geocoder.geocode(
          { address: address },
          translateAddressAndFocus.bind(this, address)
        );
      }
    } else if (address === undefined && scrollTo !== undefined) {
      setScrollTo(undefined);
    }
  }

  const translateAddressAndFocus = (inputAddress:any, results:any, status:any) => {
    if (status === (window as any).google.maps.GeocoderStatus.OK) {
      let location = results[0].geometry.location;
      setLocationsCache(locationsCache.set(inputAddress, location));
      focusOnLocation(location);
    } else {
      console.warn(
        'Geocode was not successful for the following reason: ' + status
      );
    }
  }

  const focusOnLocation = (location:any) => {
    setScrollTo(location)
  }

    const style = {
      position: 'relative',
      width: '100%',
      height: '400px'
    };

    let markers = markerLocations.map((location:any, index:number) => {
      return <Marker position={location} key={index} />;
    });

    return (
      <Map
        className="map"
        style={style}
        google={(window as any).google}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        zoom={4}
        clickableIcons={false}
      >
        {markers}
        <MapScroller scrollTo={scrollTo} />
      </Map>
    );
}

type MyProps = {
  // using `interface` is also ok
  scrollTo: any;
};

class MapScroller extends Component<MyProps> {
  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillUpdate(nextProps:any) {
    if (nextProps.map && nextProps.scrollTo) {
      let scrollAnchor = ReactDOM.findDOMNode(this);
      Scroll.animateScroll.scrollTo((scrollAnchor as HTMLElement).offsetTop);
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
