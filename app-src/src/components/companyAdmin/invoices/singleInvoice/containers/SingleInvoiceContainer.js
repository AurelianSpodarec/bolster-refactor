import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllInvoiceItems from 'actions/companyAdmin/invoices/async/fetchAllInvoiceItems';

import SingleInvoice from '../presentational/SingleInvoice';

class SingleInvoiceContainer extends Component {
    render() {
        return <SingleInvoice id={this.props.match.params} />;
    }

    componentDidMount = () => {
        this.props.fetchInvoiceAndItems();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchInvoiceAndItems: () => {
        dispatch(fetchAllInvoices());
        dispatch(fetchAllInvoiceItems());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleInvoiceContainer);
