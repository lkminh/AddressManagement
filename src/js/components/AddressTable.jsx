import React from 'react';
import AddressItem from './AddressItem.jsx';
import styles from '../../css/addressTable.css';

export default class AddressTable extends React.Component {
    createCSV() {
        let csvContent = this.props.addressList.reduce((acc, address) => {
            address = Object.assign({}, address);
            delete address.id;
            // quote data to deal with commas
            acc += `"${Object.values(address).join('","')}"\n`;
            return acc;
        }, "Street,Ward,District,City,Country\n");
        // Remove the last '\n'
        csvContent = csvContent.substring(0, csvContent.length - 1);
        return encodeURI(csvContent);
    }

    render() {
        let items = this.props.addressList.map((address) => (
            <AddressItem
                street={address.street}
                ward={address.ward}
                district={address.district}
                city={address.city}
                country={address.country}
                key={address.id}
                onClickDeleteButton={() => this.props.onDeleteAddressItem(address.id)}
                onClickEditButton={() => this.props.onClickEditAddressButton(address.id)}/>
        ));

        // Only display "Export to CSV" link if there is at least 1 address
        let exportCSVLink = null;
        if (items.length > 0) {
            exportCSVLink = (
                <a
                    style={{float: "right"}}
                    href={"data:text/csv;charset=utf-8," + this.createCSV()}
                    download="addresses.csv"
                    target="_blank">Export to CSV</a>
            )
        }

        return (
            <div className="address-table">
                <table>
                    <thead>
                        <tr>
                            <th>Street</th>
                            <th>Ward</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <button type="button" className="flat-button" onClick={this.props.onClickAddButton}>Add Address</button>
                {exportCSVLink}
            </div>

        );
    }
}
