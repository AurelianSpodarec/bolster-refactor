import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import removeUserDrawingsAccess from 'actions/companyAdmin/userManagement/async/removeUserDrawingsAccess';

const RemoveUserDrawingsAccessModalContainer = ({
    checkedDrawings,
    userID,
    removeUserDrawingsAccess,
    hideModal
}) => (
    <ConfirmDeleteModal
        handleDelete={() =>
            removeUserDrawingsAccess(userID, { drawingIDs: checkedDrawings })
        }
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        message={
            checkedDrawings.length > 1
                ? 'Are you sure you want to remove these drawings from this user?'
                : 'Are you sure you want to remove this drawing from this user?'
        }
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    removeUserDrawingsAccess: (userID, postBody) => {
        dispatch(removeUserDrawingsAccess(userID, postBody));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(RemoveUserDrawingsAccessModalContainer);
