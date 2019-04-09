import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InvoiceDetailsContainer from '../containers/InvoiceDetailsContainer';

const SingleInvoice = ({ id }) => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: `Invoice #${id}` }]} />
            <InvoiceDetailsContainer />
        </>
    );
};

export default SingleInvoice;
