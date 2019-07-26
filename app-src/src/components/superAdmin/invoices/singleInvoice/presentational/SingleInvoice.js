import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
// import InvoicePaymentsContainer from '../containers/InvoicePaymentsContainer';

const SingleInvoice = ({ id, toggleDeleteInvoiceModal }) => (
    <>
        <PageHeading leftChildren title={`Invoice #${id}`} withBackButton />
        <div className="flex-row size-lg-12">
            <InvoiceDetailsContainer />
            {/* <InvoicePaymentsContainer /> */}
        </div>

        <BlockContainer>
            <BlockHeading title="Invoice Items" />
            <InvoiceItemsTableContainer />
        </BlockContainer>
        <div className="size-lg-12">
            <div className="content-container size-lg-12">
                <div className="button-container outside-block">
                    <button
                        onClick={toggleDeleteInvoiceModal}
                        className="button red"
                    >
                        <i className="far fa-trash-alt fa-fw" />
                        Delete Invoice
                    </button>
                </div>
            </div>
        </div>
    </>
);

export default SingleInvoice;
