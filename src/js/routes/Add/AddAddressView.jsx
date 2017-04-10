import React from 'react'
import AddressForm from '../../components/AddressForm.jsx'
import { addAddress } from '../../store/address.js'
export default class AddAddressView extends React.Component {
    constructor(props) {
        super(props);
        this.onAddAddress = this.onAddAddress.bind(this);
    }
    onAddAddress(address) {
        let {store, router} = this.context;
        store.dispatch(addAddress(address));
        router.history.push('/');
    }
    render() {
        return (
            <div>
                <h2>Add Address</h2>
                <AddressForm
                    submitButtonTitle="Add"
                    onReceiveAddress={this.onAddAddress}
                    onCancel={() => this.context.router.history.goBack()}/>
            </div>
        )
    }
}

AddAddressView.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
};