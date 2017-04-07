import React from 'react';
import MapPicker from './MapPicker.jsx';
import Utils from '../utils/utils.js'
import styles from '../../css/addressForm.css';

export default class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        // initilize the state with value from props.address if any
        this.state = Object.assign({
            street: "",
            ward: "",
            district: "",
            city: "",
            country: "",
            showMapPicker: false
        }, props.address);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickPickButton = this.onClickPickButton.bind(this);
        this.onClickAddButton = this.onClickAddButton.bind(this);
        this.onPickAddress = this.onPickAddress.bind(this);
        this.onCancelMapPicker = this.onCancelMapPicker.bind(this);
    }

    onChangeInput(field, event) {
        let newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
    }

    onPickAddress(fullAddress) {
        // set state with parsed address value,
        // also close the map picker by setting showMapPicker to false
        let address = Utils.parseAddress(fullAddress);
        this.setState(Object.assign({showMapPicker: false}, address));
    }

    onClickPickButton() {
        this.setState({
            showMapPicker: true
        });
    }

    onCancelMapPicker() {
        this.setState({
            showMapPicker: false
        });
    }

    onClickAddButton() {
        let street = this.state.street.trim();
        let ward = this.state.ward.trim();
        let district = this.state.district.trim();
        let city = this.state.city.trim();
        let country = this.state.country.trim();

        if (street.length <= 0 &&
           ward.length <= 0 &&
           district.length <= 0 &&
           city.length <= 0 &&
           country.length <= 0) {
            alert("Please enter at least 1 field");
            return;
        }

        if (this.props.onReceiveAddress) {
            //let id = null;
            //if (this.props.address && this.props.address.id) {
            //    // if address is set as default then re-use its id
            //    id = this.props.address.id;
            //} else {
            //    // otherwise, generate a new id
            //    id = new Date().getTime();
            //}

            let data = {
                //id: id,
                street: street,
                ward: ward,
                district: district,
                city: city,
                country: country
            };
            this.props.onReceiveAddress(data);
        }
    }

    render() {
        let buttonLabel = this.props.submitButtonTitle || "Submit";
        let mapPicker = null;
        if (this.state.showMapPicker) {
            mapPicker = <MapPicker onPickAddress={this.onPickAddress} onCancel={this.onCancelMapPicker}/>;
        }
        return (
            <div>
                <form className="address-form">
                    <div className="form-group">
                        <label>Street</label>
                        <input type="text" onChange={(e) => this.onChangeInput('street', e)} value={this.state.street}/>
                    </div>
                    <div className="form-group">
                        <label>Ward</label>
                        <input type="text" onChange={(e) => this.onChangeInput('ward', e)} value={this.state.ward}/>
                    </div>
                    <div className="form-group">
                        <label>District</label>
                        <input type="text" onChange={(e) => this.onChangeInput('district', e)} value={this.state.district}/>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" onChange={(e) => this.onChangeInput('city', e)} value={this.state.city}/>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" onChange={(e) => this.onChangeInput('country', e)} value={this.state.country}/>
                    </div>
                    <div className="form-group action-button-group">
                        <button className="flat-button map-button" type="button" onClick={this.onClickPickButton}>Pick  location from map</button>
                        <button type="button" className="flat-button action-button" onClick={this.onClickAddButton}>{buttonLabel}</button>
                        <button type="button" className="flat-button action-button" onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </form>
                {mapPicker}
            </div>
        );
    }
}
