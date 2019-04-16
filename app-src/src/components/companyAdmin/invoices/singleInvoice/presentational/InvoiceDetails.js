import React from 'react';
import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const InvoiceDetails = ({
    isFetching,
    error,
    invoice: { createdOn, id, isPaid, paymentType, total, isRenewal }
}) => {
    return (
        <BlockContainer error={error} isEmpty={!id} isFetching={isFetching}>
            <BlockHeading title="Invoice Details" />

            <FieldOutput
                title="Invoice no"
                description={`${id}`}
                sizeClass="size-lg-4"
            />
            <FieldOutput
                title="Date"
                description={moment(createdOn).format('DD/MM/YY')}
                sizeClass="size-lg-4"
            />
            <FieldOutput
                title="Type"
                description={isRenewal ? 'Renewal' : 'New Purchase'}
                sizeClass="size-lg-4"
            />
            <FieldOutput
                title="Status"
                description={isPaid ? 'Paid' : 'Not Paid'}
                sizeClass="size-lg-4"
            />

            {isPaid && (
                <FieldOutput
                    title="Payment Method"
                    description={PAYMENT_TYPES[paymentType]}
                    sizeClass="size-lg-4"
                />
            )}

            <FieldOutput
                title="Total"
                description={`${total && total.toFixed(2)} GBP (inc. VAT)`}
                sizeClass="size-lg-12"
            />
        </BlockContainer>
    );
};

export default InvoiceDetails;
