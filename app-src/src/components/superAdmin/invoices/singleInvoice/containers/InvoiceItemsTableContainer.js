import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceItemsTable from 'components/companyAdmin/invoices/singleInvoice/presentational/InvoiceItemsTable';

// TODO: move InvoiceItemsTable and children to a shared folder, they are already generic to company/superadmin

const InvoiceItemsTableContainer = ({
    invoice,
    error,
    isFetching,
    invoiceItems
}) => <InvoiceItemsTable {...{ invoice, error, isFetching, invoiceItems }} headers={['Item', 'Customer name', 'QTY', 'Item Price', 'Item VAT', 'Total']}/>;

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: {
                invoices,
                isFetching: fetchingInvoices,
                invoiceItems,
                error
            }
        }
    },
    { match }
) => ({
    error,
    isFetching: fetchingInvoices,
    invoice: invoices[match.params.id] || {},
    invoiceItems: Object.values(invoiceItems).filter(
        ({ invoiceID }) => +invoiceID === +match.params.id
    )
});

export default withRouter(connect(mapStateToProps)(InvoiceItemsTableContainer));
