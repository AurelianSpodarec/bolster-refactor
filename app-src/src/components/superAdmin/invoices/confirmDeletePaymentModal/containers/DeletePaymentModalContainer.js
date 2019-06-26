import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const DeleteDocumentModalContainer = ({
    id,
    value,
    invoiceID,
    deleteInvoicePayment,
    hideModal,
    postSuccess,
    showModal
}) => {
    useEffect(() => {
        if (postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Invoice payment successfully deleted.'
            });
        }
    }, [postSuccess]);

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
};

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
        dispatch(hideModal());
    },
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteDocumentModalContainer);
