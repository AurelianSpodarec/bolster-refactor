import React from 'react';
import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';

const InvoiceDetails = ({
    isFetching,
    error,
    invoice: { createdOn, id, isPaid, paymentType, total, isRenewal }
}) => {
    return (
        <BlockContainer
            heading={`${isRenewal ? 'Renewal' : ''} Details`}
            isFetching={isFetching}
            error={error}
            isEmpty={!id}
        >
            <p>{`Invoice no: ${id}`}</p>
            <p>{`Date: ${moment(createdOn).format('DD/MM/YY')}`}</p>
            <p>{`Status: ${isPaid ? 'Paid' : 'Not Paid'}`}</p>
            {isPaid && <p>{`Payment Method: ${PAYMENT_TYPES[paymentType]}`}</p>}
            <p>{`Total: ${total && total.toFixed(2)} GBP (inc. VAT)`}</p>
        </BlockContainer>
    );
};

export default InvoiceDetails;
