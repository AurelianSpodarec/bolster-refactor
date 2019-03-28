import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteEnquiry from 'actions/enquiries/async/deleteEnquiry';
import { hideModal } from 'actions/generic/modals/sync/hideModal';

const DeleteEnquiryModalContainer = ({ id, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(id)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this enquiry?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteEnquiry(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteEnquiryModalContainer);
