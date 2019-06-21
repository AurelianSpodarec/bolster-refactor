import React from 'react';
import { connect } from 'react-redux';

import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';

const DeleteDocumentModalContainer = ({ id, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(id)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this payment OF ###VALUE ###?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteInvoicePayment(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteDocumentModalContainer);
