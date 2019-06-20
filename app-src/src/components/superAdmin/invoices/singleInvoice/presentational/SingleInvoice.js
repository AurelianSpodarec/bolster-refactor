import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import InvoicePayments from './InvoicePayments';

const SingleInvoice = ({ id }) => (
    <>
        <PageHeading leftChildren title={`Invoice #${id}`} withBackButton />
        <InvoiceDetailsContainer />
        <InvoicePayments />
        <BlockContainer>
            <BlockHeading title="Invoice Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
    </>
);

export default SingleInvoice;
