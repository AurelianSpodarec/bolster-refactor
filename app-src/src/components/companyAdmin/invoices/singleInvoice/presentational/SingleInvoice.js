import React from 'react';
import { withRouter } from 'react-router-dom';

import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import InvoicePaymentsTableContainer from '../../invoicePayments/containers/InvoicePaymentsTableContainer';

const SingleInvoice = ({ id }) => (
    <>
        <PageHeading
            leftChildren={true}
            title={`Invoice #${id}`}
            withBackButton
        />
        <InvoiceDetailsContainer />
        <BlockContainer containerClass="size-lg-8">
            <BlockHeading title="Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
        <BlockContainer containerClass="size-lg-4">
            <BlockHeading title="Payments" />
            <InvoicePaymentsTableContainer />
        </BlockContainer>
    </>
);

export default withRouter(SingleInvoice);
