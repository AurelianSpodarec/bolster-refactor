import React, { useEffect, useState } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { PAYMENT_TYPES, DATE_TIME_IDS, INVOICE_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import {
    ADMIN_CONFIRM_FREE_INVOICE,
    ADMIN_CONFIRM_SET_IS_INVOICE_PAID,
    ADMIN_DELETE_INVOICE,
    ADMIN_RESTORE_INVOICE,
} from 'constants/shared/modalTypes';
import { INVOICE_GEN_URL } from 'config';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const InvoiceDetails = ({
    isFetching,
    companyName,
    error,
    invoice: { createdOn, id, isPaid, paymentType, total, isRenewal, guid, comment, invoiceType, isDeleted },
    invoice,
    showModal,
    handleShowModal,
}) => {
    const [commentValue, setCommentValue] = useState(comment || '');

    useEffect(() => {
        setCommentValue(comment);
    }, [comment]);

    return (
        <BlockContainer
            containerClass="flex-row-item size-lg-12"
            error={error}
            isEmpty={!id}
            isFetching={isFetching}
        >
            <BlockHeading title="Invoice Details">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${INVOICE_GEN_URL}/${guid}/invoice-${id}`}
                    className="button blue"
                >
                    <i className="fa fa-download fa-fw" /> Download Invoice
                </a>
                {isDeleted && (
                    <button
                        onClick={() => showModal(ADMIN_RESTORE_INVOICE, { invoice, id })}
                        className="button green"
                    >
                        <i className="fa fa-recycle fa-fw" /> Restore Invoice
                    </button>
                )}
                {!isDeleted && (
                    <>
                        {!isPaid && (
                            <button
                                onClick={() => showModal(ADMIN_CONFIRM_FREE_INVOICE, { id })}
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
                        <button
                            onClick={() => showModal(ADMIN_DELETE_INVOICE, { invoice, id })}
                            className="button red"
                        >
                            <i className="fa fa-trash fa-fw" /> Delete Invoice
                        </button>
                    </>
                )}
            </BlockHeading>

            <FieldOutput title="Invoice no" description={`${id}`} sizeClass="size-lg-4" />
            <FieldOutput title="Date" sizeClass="size-lg-4">
                <p>
                    <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
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
            <FieldOutput title="Company" description={companyName} sizeClass="size-lg-4" />
            <FieldOutput
                title="Invoice Type"
                description={INVOICE_TYPES[invoiceType] || '-'}
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
            <div className="size-lg-12">
                <FieldOutput title="Comments" fieldClass="comments" sizeClass="size-md-12">
                    <TextAreaContainer
                        name={commentValue}
                        value={commentValue}
                        handleChange={(name, value) => setCommentValue(value)}
                    />
                </FieldOutput>
            </div>

            <BlockButtonWrapper>
                <button onClick={() => handleShowModal(id, commentValue)} className="button green">
                    <i className="far fa-trash-alt" />
                    Save Comment
                </button>
            </BlockButtonWrapper>
        </BlockContainer>
    );
};

export default InvoiceDetails;
