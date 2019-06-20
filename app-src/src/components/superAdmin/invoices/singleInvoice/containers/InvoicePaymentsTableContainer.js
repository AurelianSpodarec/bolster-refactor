import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoicePaymentsTable from '../presentational/InvoicePaymentsTable';

// TODO: move InvoiceItemsTable and children to a shared folder, they are already generic to company/superadmin

const InvoicePaymentsTableContainer = ({
    error,
    isFetching,
    company,
    payments
}) => (
    <InvoicePaymentsTable
        {...{ payments, error, isFetching, company }}
        headers={['Date', 'Value', '']}
    />
);

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: {
            invoicePayments,
            isFetching: fetchingInvoices,
            error
        }
    }
}) => ({
    error: error,
    isFetching: fetchingInvoices,
    // change this
    payments: [1, 2, 3]
});

export default withRouter(
    connect(mapStateToProps)(InvoicePaymentsTableContainer)
);
