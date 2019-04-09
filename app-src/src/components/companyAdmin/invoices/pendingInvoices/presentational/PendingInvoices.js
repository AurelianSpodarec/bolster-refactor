import React from 'react';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const PendingInvoices = ({ invoices }) => (
    <BlockContainer heading="Pending Invoices">
        <InvoicesTableContainer invoices={invoices} />
    </BlockContainer>
);

export default PendingInvoices;
