import React, {Component} from 'react'
import GoogleMapsAPI from "../APIs/GoogleMapsAPI"

export default class Map extends Component
{
    constructor(props)
    {
        super(props);
        this.renderMap = this.renderMap.bind(this);
        this.googleApiLoaded = this.googleApiLoaded.bind(this);
        this.markerAdded = this.markerAdded.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.GetMap = this.GetMap.bind(this);
        this.state = {googleLoaded: false};
    }

    googleApiLoaded()
    {
        this.google = GoogleMapsAPI.Get();
        this.bounds = new this.google.maps.LatLngBounds();
        this.setState({googleLoaded: true});
    }

    renderMap()
    {
        if(!this.state.googleLoaded)
        {
            return;
        }
        let mapOptions = {
            center: {
                lat: 48.858608,
                lng: 2.294471
            },
            zoom: 16,
            mapTypeId: this.google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            scaleControl: true,
            panControl: true,
            streetViewControl: true,
            zoomControl: true,
            keyboardShortcuts: false,
            draggable: true,
            zoomControlOptions: {
                style: this.google.maps.ZoomControlStyle.DEFAULT
            }
        };
        this.map = new this.google.maps.Map(this.refs.map, mapOptions);
    }

    GetMap()
    {
        return this.map;
    }

    componentDidMount()
    {
        if(GoogleMapsAPI.loaded)
        {
            this.googleApiLoaded();
        }
        else
        {
            GoogleMapsAPI.addLoadListener(this.googleApiLoaded);
        }
    }

    componentDidUpdate()
    {
        this.renderMap();
    }

    markerAdded(position)
    {
        this.bounds.extend(position);
        this.map.fitBounds(this.bounds);
    }

    render()
    {
        return (
            <div ref="scriptPlaceholder">
                <div className="map js-map" id="map" ref="map">
                    {this.props.children}
                </div>
            </div>);
    }
}