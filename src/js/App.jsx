import React from 'react';
import AddressForm from './components/AddressForm.jsx';
import AddressItem from './components/AddressItem.jsx';
import AddressTable from './components/AddressTable.jsx';
import style from '../css/style.css';
import { addressReducer, deleteAddress, addAddress, editAddress } from './store/address.js';
import { viewReducer, viewAddAddress, viewEditAddress, viewListAddress, VIEW_NAME } from './store/view.js';
import { configureStore } from './store/configureStore.js';

const STORAGE_KEY = "--addresses--";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const initialState = {
            address: this.loadData()
        };
        this.store = configureStore(initialState);

        this.onAddAddress = this.onAddAddress.bind(this);
        this.onEditAddress = this.onEditAddress.bind(this);
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

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.saveData(this.store.getState().address);
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    openAddAddressForm() {
        this.store.dispatch(viewAddAddress());
    }

    openEditAddressForm(id) {
        this.store.dispatch(viewEditAddress(id));
    }

    cancelAddressForm() {
        this.store.dispatch(viewListAddress());
    }

    onAddAddress(address) {
        this.store.dispatch((dispatch) => {
            dispatch(addAddress(address));
            dispatch(viewListAddress());
        });
        //
        //    this.store.dispatch(addAddress(address));
        //    this.store.dispatch(viewListAddress());

    }

    onEditAddress(addressId, address) {
        this.store.dispatch((dispatch) => {
            dispatch(editAddress(addressId, address));
            dispatch(viewListAddress());
        });
    }

    onDeleteAddress(id) {
        if (confirm("Delete this address?")) {
            this.store.dispatch(deleteAddress(id));
        }
    }

    render() {
        let child = null;
        switch (this.store.getState().view.name) {
            case VIEW_NAME.ADD: {
                child = <AddressForm
                    onReceiveAddress={this.onAddAddress}
                    onCancel={this.cancelAddressForm}
                    isEdit={false}/>;
                break;
            }
            case VIEW_NAME.EDIT: {
                let addressIdToEdit = this.store.getState().view.addressIdToEdit;
                let addressToEdit = this.store.getState().address[addressIdToEdit];
                child = <AddressForm
                    onReceiveAddress={(address) => this.onEditAddress(addressIdToEdit, address)}
                    onCancel={this.cancelAddressForm}
                    isEdit={true}
                    address={addressToEdit}/>;
                break;
            }
            case VIEW_NAME.LIST:
            default: {
                let addressList = Object.values(this.store.getState().address);
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
