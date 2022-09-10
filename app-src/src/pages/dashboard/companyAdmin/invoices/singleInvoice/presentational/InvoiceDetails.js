import React from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES, DATE_TIME_IDS, INVOICE_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components_DEPRECATED/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components_DEPRECATED/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import { INVOICE_GEN_URL } from 'config';
import { ReactComponent as TrashIcon } from 'assets/images/icons/trash.svg';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';

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
        guid,
        isRequestedForDelete,
        invoiceType,
    },
    toggleConfirmDeleteModal,
    showDeleteButton,
}) => {
    return (
        <BlockContainer error={error} isEmpty={!id} isFetching={isFetching}>
            <BlockHeading title="Invoice Details">
                <ButtonWrapper alignment="right">
                    {showDeleteButton &&
                        (!isRequestedForDelete ? (
                            <ActionButton
                                text="Request Delete Invoice"
                                onClick={toggleConfirmDeleteModal}
                                icon="envelope"
                                size="small"
                            />
                        ) : (
                            <ActionButton
                                text="Delete invoice requested"
                                source="secondary"
                                ambient="positive"
                                svgIconComponent={TrashIcon}
                                size="small"
                                disabled
                            />
                        ))}

                    <LinkButton
                        text="Download Invoice"
                        icon="download"
                        href={`${INVOICE_GEN_URL}/${guid}/invoice-${id}`}
                        isExternalLink
                        openInNewTab
                        isDownloadable
                        downloadName={`invoice-${id}.pdf`}
                    />
                </ButtonWrapper>
            </BlockHeading>

            <FieldOutput
                title="Invoice no"
                description={`${id}`}
                sizeClass="size-lg-4 size-md-12"
            />
            <FieldOutput title="Date" sizeClass="size-lg-4 size-md-12">
                <p>
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
            <FieldOutput
                title="Invoice Type"
                description={INVOICE_TYPES[invoiceType] || '-'}
                sizeClass="size-lg-4 size-md-12"
            />

            {isPaid && (
                <FieldOutput
                    title="Payment Method"
                    description={PAYMENT_TYPES[paymentType] || '-'}
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
};

export default InvoiceDetails;
