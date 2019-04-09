import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PendingInvoicesContainer from 'components/companyAdmin/subscription/pendingInvoices/containers/PendingInvoicesContainer';

const Invoices = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: '##invoices##' }]} />
            <PendingInvoicesContainer />
        </>
    );
};

export default Invoices;
