import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';

import InvoicePaymentsContainer from '../containers/InvoicePaymentsContainer';

const SingleInvoice = ({ id }) => (
    <>
        <PageHeading leftChildren title={`Invoice #${id}`} withBackButton />
        <div className="flex-row size-lg-12">
            <InvoiceDetailsContainer />
            <InvoicePaymentsContainer />
        </div>

        <BlockContainer>
            <BlockHeading title="Invoice Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
    </>
);

export default SingleInvoice;
