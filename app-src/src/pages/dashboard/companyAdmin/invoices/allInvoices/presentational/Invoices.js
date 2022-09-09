import React from 'react';
import PendingInvoicesContainer from 'pages/dashboard/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import PaidInvoicesContainer from '../../paidInvoices/containers/PaidInvoicesContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Invoices = () => (
    <>
        <PageHeading title="My Invoices" />
        <PendingInvoicesContainer />
        <PaidInvoicesContainer />
    </>
);

export default Invoices;
