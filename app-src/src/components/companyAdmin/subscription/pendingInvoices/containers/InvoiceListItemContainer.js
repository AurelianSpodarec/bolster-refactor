import React, { Component } from 'react';
import InvoiceListItem from '../presentational/InvoiceListItem';

export default class InvoiceListItemContainer extends Component {
    render = () => <InvoiceListItem invoice={this.props.invoice} />;
}
