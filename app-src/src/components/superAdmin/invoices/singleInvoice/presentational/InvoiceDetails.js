import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import {
    ADMIN_CONFIRM_FREE_INVOICE,
    ADMIN_CONFIRM_SET_IS_INVOICE_PAID
} from 'constants/shared/modalTypes';

const InvoiceDetails = ({
    isFetching,
    companyName,
    error,
    invoice: { createdOn, id, isPaid, paymentType, total, isRenewal },
    showModal
}) => (
    <BlockContainer
        containerClass="flex-row-item size-lg-12"
        error={error}
        isEmpty={!id}
        isFetching={isFetching}
    >
        <BlockHeading title="Invoice Details">
            {!isPaid && (
                <button
                    onClick={() =>
                        showModal(ADMIN_CONFIRM_FREE_INVOICE, { id })
                    }
                    className="button red"
                >
                    <i className="far fa-money-bill-alt fa-fw" /> Make Free
                </button>
            )}
            <button
                onClick={() =>
                    showModal(ADMIN_CONFIRM_SET_IS_INVOICE_PAID, { isPaid, id })
                }
                className="button green"
            >
                <i className="fa fa-plus fa-fw" /> Mark invoice as{' '}
                {isPaid ? 'Unpaid' : 'Paid'}
            </button>
        </BlockHeading>

        <FieldOutput
            title="Invoice no"
            description={`${id}`}
            sizeClass="size-lg-4"
        />
        <FieldOutput title="Date" sizeClass="size-lg-4">
            <p>
                <DateTimeContainer
                    date={createdOn}
                    datetime={DATE_TIME_IDS.DATE}
                />
            </p>
        </FieldOutput>
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
        <FieldOutput
            title="Company"
            description={companyName}
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
            description={`${total && formatCurrency(total)} GBP (inc. VAT)`}
            sizeClass="size-lg-12"
        />
    </BlockContainer>
);

export default InvoiceDetails;
