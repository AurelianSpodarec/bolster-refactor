import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import RecordPaymentModal from '../presentational/RecordPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editInvoicePayment from 'actions/superAdmin/invoices/async/editInvoicePayment.js';

const EditPaymentModalContainer = ({
    hideModal,
    invoice,
    invoicePayments,
    payment
}) => {
    const [paymentValue, updatePaymentValue] = useState(Number(0).toFixed(2));

    // useEffect(() => {
    //     updatePaymentValue(payment.value);
    // }, []);

    const paymentsSum = invoicePayments.reduce((acc, payment) => {
        return (acc = acc + payment.value);
    }, 0);

    return (
        <RecordPaymentModal
            handleSubmit={handleSubmit}
            handleUpdateValue={handleUpdateValue}
            paymentsSum={paymentsSum}
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
        editInvoicePayment(payment.id, paymentValue);
    }
};

const mapDispatchToProps = {
    hideModal,
    editInvoicePayment
};

export default connect(
    null,
    mapDispatchToProps
)(EditPaymentModalContainer);
