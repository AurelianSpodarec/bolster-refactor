import React from 'react';
import { withRouter } from 'react-router-dom';

import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SingleInvoice = ({ id }) => (
    <>
        <PageHeading
            leftChildren={true}
            title={`Invoice #${id}`}
            withBackButton
        />
        <InvoiceDetailsContainer />
        <BlockContainer>
            <BlockHeading title="Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
    </>
);

export default withRouter(SingleInvoice);
