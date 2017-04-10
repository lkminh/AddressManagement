import React from 'react'
import PropTypes from 'prop-types'
import AddressForm from '../../components/AddressForm.jsx'
import { editAddress } from '../../store/address.js'
export default class AddAddressView extends React.Component {
    constructor(props) {
        super(props);
        this.onEditAddress = this.onEditAddress.bind(this);
    }
    onEditAddress(address) {
        let {store, router} = this.context;
        store.dispatch(editAddress(this.props.match.params.addressId, address));
        router.history.push("/");
    }
    render() {
        let {store, router} = this.context;
        let addressId = this.props.match.params.addressId;
        let addressToEdit = store.getState().address[addressId];
        return (
            <div>
                <h2>Edit Address</h2>
                {
                    addressToEdit ?
                        <AddressForm
                            address={addressToEdit}
                            submitButtonTitle="Update"
                            onReceiveAddress={this.onEditAddress}
                            onCancel={() => router.history.goBack()}/>
                        :
                        <p>No Such Address</p>
                }
            </div>
        )
    }
}

AddAddressView.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object
};