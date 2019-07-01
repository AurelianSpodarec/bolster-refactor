import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';
import deleteDemoRequest from 'actions/superAdmin/demoRequests/async/deleteDemoRequest';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteDemoRequestModelContainer = ({ id, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(id)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this demo request?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteDemoRequest(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteDemoRequestModelContainer);
