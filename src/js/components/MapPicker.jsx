import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import {Overlay} from 'react-overlay-popup';
import GoogleGeocoder from '../utils/googleGeocoder.js';
import styles from '../../css/mapPicker.css';

const API_KEY = 'AIzaSyA5AwZHAeN0T72LEiviy836Xln98IKBOQs';
const geocoder = new GoogleGeocoder(API_KEY);

export default class MapPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCenter: {latitude: 14.0583, longitude:108.2772},
            selectedLocation: null,
            selectedAddress: ""
        }
        this.onDoubleClickMap = this.onDoubleClickMap.bind(this);
        this.onMapCreated = this.onMapCreated.bind(this);
        this.onMapDragEnd = this.onMapDragEnd.bind(this);
        this.onClickCurrentButton = this.onClickCurrentButton.bind(this);
        this.onClickOKButton = this.onClickOKButton.bind(this);
    }

    componentDidMount() {
        this.requestCurrentPosition((position) => {
            this.setState({
                mapCenter: position.coords
            });
        });
    }

    onMapCreated(map) {
        this.map = map;
        map.setOptions({
            draggableCursor:'crosshair',
            // Reserve double click action for picking location
            disableDoubleClickZoom: true
        });
    }

    onMapDragEnd(e) {
        this.setState({
            mapCenter: {
                latitude: this.map.center.lat(),
                longitude: this.map.center.lng(),
            }
        });
    }

    onDoubleClickMap(e) {
        let lat = e.latLng.lat();
        let long = e.latLng.lng();
        this.setState({
            selectedLocation: {
                latitude: lat,
                longitude: long
            },
            mapCenter: {
                latitude: lat,
                longitude: long,
            }
        });
        this.requestAddress(lat, long);
    }

    requestAddress(lat, long) {
        geocoder.reverseGeocoding(lat, long, {"language": "en"}, (err, data) => {
            if (err == null) {
                this.setState({
                    selectedAddress: data.results[0].formatted_address
                })
            } else {
                alert("No possible address, please pick another location");
                this.setState({
                    selectedAddress: ""
                })
            }
        });
    }

    requestCurrentPosition(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(callback);
        } else {
            alert("Geolocation is not supported");
        }
    }

    onClickCurrentButton() {
        this.requestCurrentPosition((position) => {
            this.setState({
                mapCenter: position.coords,
                selectedLocation: position.coords
            });
            this.requestAddress(position.coords.latitude, position.coords.longitude);
        });
    }

    onClickOKButton() {
        if (this.state.selectedAddress) {
            if (this.props.onPickAddress) {
                this.props.onPickAddress(this.state.selectedAddress);
            }
        } else {
            alert("Please pick a location");
        }
    }

    render() {
        let marker = null;
        if (this.state.selectedLocation != null) {
            marker = <Marker
                      lat={this.state.selectedLocation.latitude}
                      lng={this.state.selectedLocation.longitude}
                      />
        }
        return (
            <Overlay>
                <div className="map-picker-container">
                    <b>Double click on the map to pick a location</b>
                    <Gmaps
                        className="google-map"
                        lat={this.state.mapCenter.latitude}
                        lng={this.state.mapCenter.longitude}
                        zoom={12}
                        params={{v: '3.exp', key: API_KEY}}
                        onDragEnd = {this.onMapDragEnd}
                        onMapCreated={this.onMapCreated}
                        onDblClick={this.onDoubleClickMap}>
                            {marker}
                    </Gmaps>
                    <div className="address-group">
                        <input type="text" className="selected-address-input" readOnly="true" value={this.state.selectedAddress}/>
                        <button type="button" className="current-location-button" onClick={this.onClickCurrentButton}></button>
                    </div>
                    <div className="action-button-group">
                        <button type="button" className="flat-button action-button" onClick={this.props.onCancel}>Cancel</button>
                        <button type="button" className="flat-button action-button" onClick={this.onClickOKButton}>OK</button>
                    </div>
                </div>
            </Overlay>
        );
    }
}
