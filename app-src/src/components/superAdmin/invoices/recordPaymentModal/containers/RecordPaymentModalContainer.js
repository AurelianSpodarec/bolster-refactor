import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecordPaymentModal from '../presentational/RecordPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import recordInvoicePayment from 'actions/superAdmin/invoices/async/recordInvoicePayment.js';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class RecordPaymentModalContainer extends Component {
    state = {
        paymentValue: Number(0).toFixed(2)
    };

    render() {
        const { hideModal, invoice, invoicePayments } = this.props;

        const { paymentValue } = this.state;

        const invoiceBalance =
            invoice.total -
            invoicePayments.reduce((acc, payment) => {
                return (acc = acc + payment.amount);
            }, 0);

        return (
            <RecordPaymentModal
                handleSubmit={this.handleSubmit}
                handleUpdateValue={this.handleUpdateValue}
                invoiceBalance={invoiceBalance}
                paymentValue={paymentValue}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { postSuccess, showModal } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Payment successfully recorded.'
            });
        }
    }
    handleUpdateValue = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const {
            invoice: { id: invoiceID },
            recordInvoicePayment
        } = this.props;
        const { paymentValue } = this.state;

        recordInvoicePayment(invoiceID, {
            invoiceID,
            amount: paymentValue,
            paymentType: 2
        });
    };
}

const mapStateToProps = ({
    superAdmin: {
        invoicePaymentsReducer: { postSuccess }
    }
}) => ({
    postSuccess
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
