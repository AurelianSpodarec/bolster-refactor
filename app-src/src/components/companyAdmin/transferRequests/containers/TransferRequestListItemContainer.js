import React, { Component } from 'react';
import TransferRequestListItem from '../presentational/TransferRequestListItem';

export default class TransferRequestListItemContainer extends Component {
    render() {
        return <TransferRequestListItem request={this.props.request} />;
    }
}
