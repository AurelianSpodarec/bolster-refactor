import React from 'react';

import {
    ADMIN_CONFIRM_PAYMENT,
    ADMIN_CONFIRM_FREE_INVOICE
} from 'constants/shared/modalTypes';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicePaymentsTableContainer from '../containers/InvoicePaymentsTableContainer';

const InvoicePayments = () => {
    return (
        <BlockContainer containerClass="size-lg-6">
            <BlockHeading title="Invoice Payments" />
            <InvoicePaymentsTableContainer />
        </BlockContainer>
    );
};

export default InvoicePayments;
