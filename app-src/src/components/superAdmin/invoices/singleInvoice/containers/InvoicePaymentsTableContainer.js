import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT
} from 'constants/shared/modalTypes';
import editInvoicePayment from 'actions/superAdmin/invoices/async/editInvoicePayment';
import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import InvoicePaymentsTable from '../presentational/InvoicePaymentsTable';

const InvoicePaymentsTableContainer = ({
    error,
    isFetching,
    company,
    invoicePayments,
    showModal,
    invoice
}) => {
    return (
        <InvoicePaymentsTable
            {...{ invoicePayments, error, isFetching, company }}
            headers={['ID', 'Date', 'Value', 'Payment Method', '']}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(type, id, value, invoiceID, paymentMethod) {
        if (type === ADMIN_EDIT_PAYMENT)
            showModal(ADMIN_EDIT_PAYMENT, {
                id,
                invoice,
                invoicePayments,
                value,
                invoiceID,
                paymentMethod
            });
        if (type === ADMIN_DELETE_PAYMENT)
            showModal(ADMIN_DELETE_PAYMENT, { id, value, invoiceID });
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices },
            invoicePaymentsReducer: {
                invoicePayments,
                isFetching: fetchingInvoices,
                error
            }
        }
    },
    { match }
) => ({
    invoice: invoices[match.params.id],
    error: error,
    isFetching: fetchingInvoices,
    invoicePayments: Object.values(invoicePayments) || []
});

const mapDispatchToProps = {
    showModal,
    editInvoicePayment,
    deleteInvoicePayment
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoicePaymentsTableContainer)
);
