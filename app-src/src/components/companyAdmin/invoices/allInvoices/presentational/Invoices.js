import React from 'react';
import PendingInvoicesContainer from 'components/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import PaidInvoicesContainer from '../../paidInvoices/containers/PaidInvoicesContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Invoices = () => (
    <>
        <PageHeading title="My Invoices" withBackButton />
        <PendingInvoicesContainer />
        <PaidInvoicesContainer />
    </>
);

export default Invoices;
