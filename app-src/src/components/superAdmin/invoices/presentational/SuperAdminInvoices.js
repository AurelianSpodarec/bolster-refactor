import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import SuperAdminInvoicesTableContainer from '../containers/SuperAdminInvoicesTableContainer';

const SuperAdminInvoices = () => (
    <>
        <PageHeading title="Invoices" withBackButton />
        <SuperAdminInvoicesTableContainer />
    </>
);

export default SuperAdminInvoices;
