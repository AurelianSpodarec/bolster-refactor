import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';
import InvoiceItemsTableContainer from '../containers/InvoiceItemsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SingleInvoice = ({ id }) => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: `Invoice #${id}` }]} />
            <InvoiceDetailsContainer />
            <BlockContainer>
                <InvoiceItemsTableContainer />
                <BlockButtonWrapper>
                    <Link to="/company/invoices" className="button">
                        Back
                    </Link>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default SingleInvoice;
