import React, { useState } from 'react';
import { connect } from 'react-redux';

import RecordPaymentModal from '../presentational/RecordPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import recordInvoicePayment from 'actions/superAdmin/invoices/async/recordInvoicePayment.js';

const RecordPaymentModalContainer = ({
    hideModal,
    invoice,
    invoicePayments
}) => {
    const [paymentValue, updatePaymentValue] = useState(Number(0).toFixed(2));
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
        recordInvoicePayment(invoice.id, paymentValue);
    }
};

const mapDispatchToProps = {
    hideModal,
    recordInvoicePayment
};

export default connect(
    null,
    mapDispatchToProps
)(RecordPaymentModalContainer);
