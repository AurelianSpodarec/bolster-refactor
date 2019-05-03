import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteDropdownOption from 'actions/companyAdmin/dropdownOptions/async/deleteDropdownOption';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';

const DeleteClientModalContainer = ({ option, handleDelete, hideModal }) => (
    <ConfirmDeleteModal
        handleDelete={() => handleDelete(option.id, option.type)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message={`Are you sure you want to delete this dropdown option - ${
            option.name
        }?`}
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: (id, type) => {
        dispatch(deleteDropdownOption(id, type));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteClientModalContainer);
