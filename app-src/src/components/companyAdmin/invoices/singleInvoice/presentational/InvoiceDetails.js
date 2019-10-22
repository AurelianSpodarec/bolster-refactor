import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';

const InvoiceDetails = ({
    isFetching,
    error,
    invoice: {
        createdOn,
        id,
        isPaid,
        paymentType,
        total,
        isRenewal,
        userFirstName,
        userLastName,
        guid
    },
    toggleConfirmDeleteModal,
    showDeleteButton
}) => (
    <BlockContainer error={error} isEmpty={!id} isFetching={isFetching}>
        <BlockHeading title="Invoice Details">
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://6eixv6n0wf.execute-api.eu-west-1.amazonaws.com/staging/bolster-invoice-gen-staging/${guid}`}
                className="button blue"
            >
                <i className="fa fa-download fa-fw" /> Download Invoice
            </a>
            {showDeleteButton && (
                <button onClick={toggleConfirmDeleteModal} className="button red">
                    <i className="far fa-trash-alt fa-fw" />
                    Delete Invoice
                </button>
            )}
        </BlockHeading>

        <FieldOutput title="Invoice no" description={`${id}`} sizeClass="size-lg-4 size-md-12" />
        <FieldOutput title="Date" sizeClass="size-lg-4 size-md-12">
            <p>
                {' '}
                asdfasdfasdfasdfasdfsdaf
                <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
            </p>
        </FieldOutput>
        <FieldOutput
            title="Type"
            description={isRenewal ? 'Renewal' : 'New Purchase'}
            sizeClass="size-lg-4 size-md-12"
        />
        <FieldOutput
            title="Status"
            description={isPaid ? 'Paid' : 'Not Paid'}
            sizeClass="size-lg-4 size-md-12"
        />
        <FieldOutput
            title="Ordered By"
            description={`${userFirstName} ${userLastName}`}
            sizeClass="size-lg-4 size-md-12"
        />

        {isPaid && (
            <FieldOutput
                title="Payment Method"
                description={PAYMENT_TYPES[paymentType]}
                sizeClass="size-lg-4 size-md-12"
            />
        )}

        <FieldOutput
            title="Total"
            description={`${total && formatCurrency(total)} GBP (inc. VAT)`}
            sizeClass="size-lg-6 size-md-12"
        />
    </BlockContainer>
);

export default InvoiceDetails;
