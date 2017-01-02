import React, {Component} from 'react'
import GoogleAPIProvider from "../APIs/GoogleMapsAPI"

export default class Marker extends Component {
    constructor(props) {
        super(props);
        this.renderMarker = this.renderMarker.bind(this);
        this.googleApiLoaded = this.googleApiLoaded.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.render = this.render.bind(this);
        this.state = {mapLoaded : false, googleApiLoaded: false};
    }

    componentDidMount()
    {
        if(GoogleAPIProvider.loaded)
        {
            this.setState({google: GoogleAPIProvider.Get(), googleApiLoaded: true});
        }
        if(!this.state.googleApiLoaded)
        {
            GoogleAPIProvider.addLoadListener(this.googleApiLoaded);
        }
    }

    componentWillUpdate()
    {
        if(this.props.map && this.state.map == null && this.props.map.GetMap() != null)
        {
            this.mapLoaded(this.props.map.GetMap());
        }
    }

    googleApiLoaded()
    {
        this.setState({google: GoogleAPIProvider.Get(), googleApiLoaded: true});
    }

    mapLoaded(map)
    {
        this.setState({map: map, mapLoaded: true});
    }

    renderMarker()
    {
        if(this.state.mapLoaded && this.state.googleApiLoaded)
        {
            let geocoder = new this.state.google.maps.Geocoder();
            geocoder.geocode({ 'address': this.props.address },
                function (results, status){
                if (status == this.state.google.maps.GeocoderStatus.OK)
                {
                    let marker = new this.state.google.maps.Marker({
                        map: this.state.map,
                        position: results[0].geometry.location
                    });
                    this.props.map.markerAdded(marker.getPosition());
                }
                else
                {
                    console.warn('Geocode was not successful for the following reason: ' + status);
                }
            }.bind(this));
        }
    }

    render()
    {
        this.renderMarker();
        return null;
    }
}