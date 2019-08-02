import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';

const PaidInvoicesContainer = ({ error, isFetching, paidInvoices }) => (
    <BlockContainer heading="Payments">
        <InvoicesTableContainer error={error} isFetching={isFetching} invoices={paidInvoices} />
    </BlockContainer>
);

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }) => ({
    paidInvoices: Object.values(invoicesReducer.invoices).filter(invoice => invoice.isPaid) || []
});

export default connect(mapStateToProps)(PaidInvoicesContainer);
