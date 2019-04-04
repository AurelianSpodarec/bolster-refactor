import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteOperative from 'actions/companyAdmin/operatives/async/deleteOperative';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteOperativeModalContainer = ({
    operative,
    handleDelete,
    hideModal
}) => {
    const { userFirstName, userLastName, id } = operative;
    return (
        <ConfirmDeleteModal
            handleDelete={() => handleDelete(id)}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message={`Are you sure you want to remove ${userFirstName} ${userLastName} as an operative from this drawing?`}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleDelete: id => {
        dispatch(deleteOperative(id));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteOperativeModalContainer);
