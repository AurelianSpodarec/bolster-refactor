import React, { Component } from 'react';
import { connect } from 'react-redux';

class InvoiceDetailsContainer extends Component {
    render() {
        return <p>deets</p>;
    }
}

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }) => ({
    invoice: invoicesReducer.invoices,
    error: invoicesReducer.error,
    isFetching: invoicesReducer.isFetching
});

export default connect(mapStateToProps)(InvoiceDetailsContainer);
