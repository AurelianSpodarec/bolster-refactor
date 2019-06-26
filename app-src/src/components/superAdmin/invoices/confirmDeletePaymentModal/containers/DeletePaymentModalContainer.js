import React, { Component } from 'react';
import { connect } from 'react-redux';

import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class DeletePaymentModalContainer extends Component {
    render() {
        const {
            id,
            value,
            invoiceID,
            deleteInvoicePayment,
            hideModal
        } = this.props;

        return (
            <ConfirmDeleteModal
                handleDelete={() => deleteInvoicePayment(id, invoiceID)}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                message={`Are you sure you want to delete this payment of £${value}.00`}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { postSuccess, showModal } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Invoice payment successfully deleted.'
            });
        }
    }
}

const mapStateToProps = ({
    superAdmin: {
        invoicePaymentsReducer: { postSuccess }
    }
}) => ({
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    deleteInvoicePayment: (id, invoiceID) => {
        dispatch(deleteInvoicePayment(id, invoiceID));
    },
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletePaymentModalContainer);
