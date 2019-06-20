import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceItemsTable from 'components/companyAdmin/invoices/singleInvoice/presentational/InvoiceItemsTable.js';

// TODO: move InvoiceItemsTable and children to a shared folder, they are already generic to company/superadmin

const InvoiceItemsTableContainer = ({
    invoice,
    error,
    isFetching,
    invoiceItems,
    company
}) => (
    <InvoiceItemsTable
        {...{ invoice, error, isFetching, invoiceItems, company }}
        headers={[
            'Item',
            'Customer name',
            'QTY',
            'Item Price',
            'Item VAT',
            'Total'
        ]}
    />
);

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: {
                invoices,
                isFetching: fetchingInvoices,
                invoiceItems,
                error
            },
            companiesReducer: {
                companies,
                isFetching: fetchingCompanies,
                error: companiesError
            }
        }
    },
    { match }
) => ({
    error: error || companiesError,
    isFetching: fetchingInvoices || fetchingCompanies,
    company: companies[match.params.id],
    invoice: invoices[match.params.id] || {},
    invoiceItems: Object.values(invoiceItems).filter(
        ({ invoiceID }) => +invoiceID === +match.params.id
    )
});

export default withRouter(connect(mapStateToProps)(InvoiceItemsTableContainer));
