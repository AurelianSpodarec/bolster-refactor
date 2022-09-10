import React from 'react';
import InvoicesTableContainer from 'pages/dashboard/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

const PendingInvoices = ({ invoices }) => (
    <BlockContainer heading="Pending Invoices" contentClass="autoWidth">
        <InvoicesTableContainer invoices={invoices} />
    </BlockContainer>
);

export default PendingInvoices;
