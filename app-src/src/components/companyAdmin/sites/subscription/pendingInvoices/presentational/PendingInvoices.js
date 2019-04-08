import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const PendingInvoices = () => {
    return (
        <BlockContainer>
            <PageHeading title="Pending Invoices" />
        </BlockContainer>
    );
};

export default PendingInvoices;
