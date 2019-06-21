import React from 'react';

import {
    ADMIN_RECORD_PAYMENT,
    ADMIN_CONFIRM_FREE_INVOICE
} from 'constants/shared/modalTypes';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicePaymentsTableContainer from '../containers/InvoicePaymentsTableContainer';

const InvoicePayments = ({ handleOpenModal }) => {
    return (
        <BlockContainer containerClass="size-lg-6">
            <BlockHeading title="Invoice Payments">
                <button
                    onClick={() => handleOpenModal(ADMIN_CONFIRM_FREE_INVOICE)}
                    className="button red"
                >
                    <i className="far fa-money-bill-alt fa-fw" /> Make Free
                </button>
                <button
                    onClick={() => handleOpenModal(ADMIN_RECORD_PAYMENT)}
                    className="button green"
                >
                    <i className="far fa-plus fa-fw" /> Record Payment
                </button>
            </BlockHeading>
            <InvoicePaymentsTableContainer />
        </BlockContainer>
    );
};

export default InvoicePayments;
