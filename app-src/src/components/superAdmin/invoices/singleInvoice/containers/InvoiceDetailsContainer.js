import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvoiceDetails from '../presentational/InvoiceDetails';

const InvoiceDetailsContainer = ({ invoice, error, isFetching }) => (
    <InvoiceDetails invoice={invoice} error={error} isFetching={isFetching} />
);

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, error, isFetching }
        }
    },
    { match }
) => ({
    invoice: invoices[match.params.id] || {},
    error,
    isFetching
});

export default withRouter(connect(mapStateToProps)(InvoiceDetailsContainer));
