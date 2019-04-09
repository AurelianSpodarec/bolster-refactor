import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InvoicesTableContainer from '../containers/InvoicesTableContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const PendingInvoices = ({ invoices }) => (
    <Block>
        <PageHeading title="Pending Invoices" />
        <InvoicesTableContainer invoices={invoices} />
    </Block>
);

export default PendingInvoices;
