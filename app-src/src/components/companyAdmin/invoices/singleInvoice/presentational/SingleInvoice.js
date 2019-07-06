import React from 'react';
import { withRouter } from 'react-router-dom';

import { PAY_INVOICE } from 'constants/shared/modalTypes';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import InvoicePaymentsTableContainer from '../../invoicePayments/containers/InvoicePaymentsTableContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SingleInvoice = ({ id, showModal, hasPayed }) => (
    <>
        <PageHeading
            leftChildren={true}
            title={`Invoice #${id}`}
            withBackButton
        />
        <InvoiceDetailsContainer />
        <BlockContainer containerClass="size-lg-8 size-md-12">
            <BlockHeading title="Items" />
            <InvoiceItemsTableContainer />
            {!hasPayed && (
                <BlockButtonWrapper sizeClasses="size-lg-12">
                    <button
                        className="button green"
                        onClick={() =>
                            showModal(PAY_INVOICE, { invoiceID: id })
                        }
                    >
                        Pay
                    </button>
                </BlockButtonWrapper>
            )}
        </BlockContainer>
        <BlockContainer containerClass="size-lg-4 size-md-12">
            <BlockHeading title="Payments" />
            <InvoicePaymentsTableContainer />
        </BlockContainer>
    </>
);

export default withRouter(SingleInvoice);
