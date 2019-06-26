import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import RecordPaymentModal from '../presentational/RecordPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import recordInvoicePayment from 'actions/superAdmin/invoices/async/recordInvoicePayment.js';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const RecordPaymentModalContainer = ({
    hideModal,
    invoice,
    invoicePayments,
    recordInvoicePayment,
    postSucess,
    showModal
}) => {
    const [paymentValue, updatePaymentValue] = useState(Number(0).toFixed(2));
    const paymentsBalance =
        invoice.total -
        invoicePayments.reduce((acc, payment) => {
            return (acc = acc + payment.amount);
        }, 0);

    useEffect(() => {
        if (postSucess) {
            showModal(SUCCESS_MODAL, {
                message: 'Payment was successfully recorded.'
            });
        }
    }, [postSucess]);

    return (
        <RecordPaymentModal
            handleSubmit={handleSubmit}
            handleUpdateValue={handleUpdateValue}
            paymentsBalance={paymentsBalance}
            paymentValue={paymentValue}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
        />
    );

    function handleUpdateValue(e) {
        updatePaymentValue(e.target.value);
    }

    function handleSubmit() {
        recordInvoicePayment(invoice.id, {
            invoiceID: invoice.id,
            amount: paymentValue,
            paymentType: 2
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicePaymentsReducer: { postSucess }
    }
}) => ({
    postSucess
});

const mapDispatchToProps = {
    hideModal,
    recordInvoicePayment,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordPaymentModalContainer);
