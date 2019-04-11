import React from 'react';
import { withRouter } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SingleInvoice = ({ id, history }) => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: `Invoice #${id}` }]} />
            <InvoiceDetailsContainer />
            <BlockContainer>
                <InvoiceItemsTableContainer />
                <BlockButtonWrapper>
                    <button
                        onClick={() => {
                            history.goBack();
                        }}
                        className="button"
                    >
                        Back
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default withRouter(SingleInvoice);
