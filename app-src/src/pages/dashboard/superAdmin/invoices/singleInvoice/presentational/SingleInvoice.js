import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
// import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
// import InvoicePaymentsContainer from '../containers/InvoicePaymentsContainer';

const SingleInvoice = ({ id }) => (
    <>
        <PageHeading leftChildren title={`Invoice #${id}`} withBackButton />
        <div className="flex-row flex-wrap width-12 size-lg-12">
            <InvoiceDetailsContainer />
        </div>

        <BlockContainer>
            <BlockHeading title="Invoice Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
    </>
);

export default SingleInvoice;
