import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import SuperAdminInvoicesTableContainer from '../containers/SuperAdminInvoicesTableContainer';
import InvoicesFilterContainer from '../containers/InvoicesFilterContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const SuperAdminInvoices = () => (
    <>
        <PageHeading title="Invoices" withBackButton></PageHeading>
        <BlockContainer>
            <InvoicesFilterContainer />
        </BlockContainer>
        <SuperAdminInvoicesTableContainer />
    </>
);

export default SuperAdminInvoices;
