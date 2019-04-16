import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PendingInvoicesContainer from 'components/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import PaidInvoicesContainer from '../../paidInvoices/containers/PaidInvoicesContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Invoices = () => {
    return (
        <>
            <PageHeading title="My Invoices" />

            <PendingInvoicesContainer />
            <PaidInvoicesContainer />
        </>
    );
};

export default Invoices;
