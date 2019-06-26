import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';

import EditPaymentModal from '../presentational/EditPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editInvoicePayment from 'actions/superAdmin/invoices/async/editInvoicePayment.js';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class EditPaymentModalContainer extends Component {
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
            <EditPaymentModal
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

    componentDidMount() {
        const { value } = this.props;
        this.setState({ paymentValue: value.toFixed(2) });
    }

    componentDidUpdate(prevProps) {
        const { postSuccess, showModal } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Payment successfully edited.'
            });
        }
    }
    handleUpdateValue = e => {
        this.setState({ paymentValue: e.target.value });
    };

    handleSubmit = () => {
        const { id, invoiceID, editInvoicePayment, paymentMethod } = this.props;
        const { paymentValue } = this.state;
        editInvoicePayment(id, invoiceID, {
            invoiceID,
            amount: paymentValue,
            paymentMethod
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
    editInvoicePayment,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPaymentModalContainer);
