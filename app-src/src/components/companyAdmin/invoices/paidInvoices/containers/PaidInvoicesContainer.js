import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import { sortArrayByField } from 'helpers/generic';

const PaidInvoicesContainer = ({ error, isFetching, paidInvoices }) => (
    <BlockContainer heading="Payments">
        <InvoicesTableContainer error={error} isFetching={isFetching} invoices={paidInvoices} />
    </BlockContainer>
);

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }) => ({
    paidInvoices: sortArrayByField(
        Object.values(invoicesReducer.invoices).filter(({ isPaid }) => isPaid),
        'createdOn',
    ),
});

export default connect(mapStateToProps)(PaidInvoicesContainer);
