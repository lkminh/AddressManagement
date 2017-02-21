import React from 'react';
import AddressForm from './components/AddressForm.jsx';
import AddressItem from './components/AddressItem.jsx';
import AddressTable from './components/AddressTable.jsx';
import style from '../css/style.css'

const STATE_LIST = "list";
const STATE_ADD = "add";
const STATE_EDIT = "edit";

const STORAGE_KEY = "--addresses--";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            addressMap: this.loadData(),
            viewState: STATE_LIST,
            addressToEdit: null,
        });
        this.onReceiveAddress = this.onReceiveAddress.bind(this);
        this.onDeleteAddress = this.onDeleteAddress.bind(this);
        this.openAddAddressForm = this.openAddAddressForm.bind(this);
        this.cancelAddressForm = this.cancelAddressForm.bind(this);
        this.openEditAddressForm = this.openEditAddressForm.bind(this);
    }

    loadData() {
        let value = localStorage.getItem(STORAGE_KEY);
        if (value != null && value.length > 0) {
            return JSON.parse(value);
        }
        return {};
    }

    saveData(addressMap = {}) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(addressMap));
    }

    openAddAddressForm() {
        this.setState({
            viewState: STATE_ADD
        })
    }

    openEditAddressForm(id) {
        let address = this.state.addressMap[id];
        if (address != null) {
            this.setState({
                viewState: STATE_EDIT,
                addressToEdit: address
            })
        } else {
            alert('Error occurs, cannot edit');
        }
    }

    cancelAddressForm() {
        this.setState({
            viewState: STATE_LIST
        })
    }

    onReceiveAddress(address) {
        let addressEntry = {};
        addressEntry[address.id] = address;
        this.setState({
            addressMap: Object.assign({}, this.state.addressMap, addressEntry),
            viewState: STATE_LIST
        }, () => this.saveData(this.state.addressMap));
    }

    onDeleteAddress(id) {
        if (confirm("Delete this address?")) {
            // create new map but exclude the address with specified id
            let newMap = Object.assign({}, this.state.addressMap);
            delete newMap[id];
            this.setState({
                addressMap: newMap
            }, () => this.saveData(this.state.addressMap));
        }
    }

    render() {
        let child = null;
        switch (this.state.viewState) {
            case STATE_ADD: {
                child = <AddressForm
                    onReceiveAddress={this.onReceiveAddress}
                    onCancel={this.cancelAddressForm}
                    isEdit={false}/>;
                break;
            }
            case STATE_EDIT: {
                child = <AddressForm
                    onReceiveAddress={this.onReceiveAddress}
                    onCancel={this.cancelAddressForm}
                    isEdit={true}
                    address={this.state.addressToEdit}/>;
                break;
            }
            case STATE_LIST:
            default: {
                let addressList = Object.values(this.state.addressMap);
                child = <AddressTable
                    addressList={addressList}
                    onDeleteAddressItem={this.onDeleteAddress}
                    onClickAddButton ={this.openAddAddressForm}
                    onClickEditAddressButton={this.openEditAddressForm}/>;
                break;
            }
        }

        return (
            <div className="app-container">
                <h1>Address Management</h1>
                {child}
            </div>
        );
    }
}
