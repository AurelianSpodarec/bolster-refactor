import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';

import Invoices from '../presentational/Invoices';

class InvoicesContainer extends Component {
    render() {
        return <Invoices />;
    }

    componentDidMount = () => {
        this.props.fetchAllInvoices();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllInvoices: () => {
        dispatch(fetchAllInvoices());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(InvoicesContainer)
);
