import React from 'react';
import { connect } from 'react-redux';

import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';

const DeleteDocumentModalContainer = ({
    id,
    value,
    invoiceID,
    handleDelete,
    hideModal
}) => {
    return (
        <ConfirmDeleteModal
            handleDelete={() => handleDelete(id, invoiceID)}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message={`Are you sure you want to delete this payment of £${value}.00`}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    deleteInvoicePayment: (id, invoiceID) => {
        dispatch(deleteInvoicePayment(id, invoiceID));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteDocumentModalContainer);
