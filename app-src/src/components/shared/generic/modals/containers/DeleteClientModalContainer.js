import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteClientFromDrawing from 'actions/companyAdmin/clients/async/deleteClientFromDrawing';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteClientModalContainer = ({ clientID, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(clientID)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this client?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: clientID => {
        dispatch(deleteClientFromDrawing(clientID));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteClientModalContainer);
