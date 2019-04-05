import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteCompanyPermissions from 'actions/companyAdmin/companies/async/deleteCompanyPermissions';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteCompanyPermissionsModalContainer = ({
    companyPermissionID,
    handleDelete,
    hideModal
}) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(companyPermissionID)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message="Are you sure you want to delete this companies permissions?"
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: companyPermissionID => {
        dispatch(deleteCompanyPermissions(companyPermissionID));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteCompanyPermissionsModalContainer);
