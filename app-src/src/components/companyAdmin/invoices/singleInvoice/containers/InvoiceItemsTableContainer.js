import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceItemsTable from 'components/shared/invoices/invoiceItemsTable/presentational/InvoiceItemsTable';

class InvoiceItemsTableContainer extends Component {
    render() {
        const { invoice, error, isFetching, invoiceItems } = this.props;
        return (
            <InvoiceItemsTable
                headers={[
                    'Item',
                    'Custom Name',
                    'QTY',
                    'Item Price',
                    'Item VAT',
                    'Total'
                ]}
                error={error}
                isFetching={isFetching}
                invoice={invoice}
                invoiceItems={invoiceItems}
            />
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
            invoicesReducer,
            invoiceItemsReducer,
            companySettingsReducer
        }
    },
    { match }
) => ({
    company: companySettingsReducer.companySettings.name,
    error: invoicesReducer.error || invoiceItemsReducer.error,
    isFetching: invoicesReducer.isFetching || invoiceItemsReducer.isFetching,
    invoice: invoicesReducer.invoices[match.params.id] || {},
    invoiceItems: Object.values(invoiceItemsReducer.invoiceItems).filter(
        item => item.invoiceID === +match.params.id
    )
});

export default withRouter(connect(mapStateToProps)(InvoiceItemsTableContainer));
