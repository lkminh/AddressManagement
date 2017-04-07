import React from 'react'
import AddressTable from '../../components/AddressTable.jsx'
import { deleteAddress } from '../../store/address.js'
export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.deleteAddressWithId = this.deleteAddressWithId.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    deleteAddressWithId(addressId) {
        if (confirm("Delete this address?")) {
            this.context.store.dispatch(deleteAddress(addressId));
        }
    }
    render() {
        let {store, router} = this.context;
        let addressList = Object.values(store.getState().address);
        return (
            <div>
                <h2>Address List</h2>
                <AddressTable
                    addressList={addressList}
                    onDeleteAddressItem={this.deleteAddressWithId}
                    onClickAddButton ={() => {router.history.push('/add')}}
                    onClickEditAddressButton={(addressId) => {router.history.push(`/edit/${addressId}`)}}/>
            </div>
        );
    }
}

HomeView.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
};
