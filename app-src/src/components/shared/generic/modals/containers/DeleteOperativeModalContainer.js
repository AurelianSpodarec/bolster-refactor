import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import deleteOperative from 'actions/companyAdmin/operatives/async/deleteOperative';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DeleteOperativeModalContainer = ({
    operative,
    drawingID,
    handleDelete,
    hideModal
}) => {
    const { userFirstName, userLastName, id: operativeID } = operative;
    return (
        <ConfirmDeleteModal
            handleDelete={() => handleDelete(drawingID, operativeID)}
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
    handleDelete: (drawingID, operativeID) => {
        dispatch(deleteOperative(drawingID, operativeID));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DeleteOperativeModalContainer);
