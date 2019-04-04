import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteCompanyUser from 'actions/companyAdmin/userManagement/async/deleteCompanyUser';

const DeleteCompanyUserModalContainer = ({ id, handleDelete, hideModal }) => {
    return (
        <ConfirmDeleteModal
            handleDelete={() => handleDelete(id)}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message="Are you sure you want to delete this user?"
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteCompanyUser(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteCompanyUserModalContainer);
