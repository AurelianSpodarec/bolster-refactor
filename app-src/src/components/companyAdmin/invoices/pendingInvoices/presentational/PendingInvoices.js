import React from 'react';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PendingInvoices = ({ invoices }) => (
    <BlockContainer>
        <BlockHeading title="Pending Invoices" />
        <InvoicesTableContainer invoices={invoices} />
    </BlockContainer>
);

export default PendingInvoices;
