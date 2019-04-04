import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteDocument from 'actions/companyAdmin/documents/async/deleteDocument';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteEnquiryModalContainer = ({ id, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(id)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this document?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteDocument(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteEnquiryModalContainer);
