import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllInvoiceItems from 'actions/companyAdmin/invoices/async/fetchAllInvoiceItems';

import Invoices from '../presentational/Invoices';

class InvoicesContainer extends Component {
    render() {
        return <Invoices />;
    }

    componentDidMount = () => {
        this.props.fetchAllInvoicesAndItems();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllInvoicesAndItems: () => {
        dispatch(fetchAllInvoices());
        dispatch(fetchAllInvoiceItems());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(InvoicesContainer)
);
