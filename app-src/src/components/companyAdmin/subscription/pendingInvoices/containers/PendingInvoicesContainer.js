import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllInvoiceItems from 'actions/companyAdmin/invoices/async/fetchAllInvoiceItems';

class PendingInvoicesContainer extends Component {
    render = () => <PendingInvoices invoices={this.props.invoices} />;

    componentDidMount = () => this.props.fetchInvoiceData();
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { invoices, error, isFetching }
    }
}) => ({
    invoices: Object.values(invoices).filter(invoice => !invoice.isPaid),
    error,
    isFetching
});

const mapDispatchToProps = dispatch => ({
    fetchInvoiceData: () => {
        dispatch(fetchAllInvoices());
        dispatch(fetchAllInvoiceItems());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvoicesContainer);
