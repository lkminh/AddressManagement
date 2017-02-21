import React from 'react';

export default class AddressItem extends React.Component {
    render() {
        // Use &nbsp; char to prevent empty cell value issue
        let nbsp = "\u00a0";
        return (
            <tr>
                <td className="cell-street">{this.props.street || nbsp}</td>
                <td className="cell-ward">{this.props.ward || nbsp}</td>
                <td className="cell-district">{this.props.district || nbsp}</td>
                <td className="cell-city">{this.props.city || nbsp}</td>
                <td className="cell-country">{this.props.country || nbsp}</td>
                <td className="cell-actions">
                    <button type="button" className="flat-button action-button" onClick={this.props.onClickEditButton}>Edit</button>
                    <button type="button" className="flat-button action-button" onClick={this.props.onClickDeleteButton}>Delete</button>
                </td>
            </tr>
        );
    }
}
