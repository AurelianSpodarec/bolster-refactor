import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import removeUserDrawingsAccess from 'actions/companyAdmin/userManagement/async/removeUserDrawingsAccess';

const RemoveUserDrawingsAccessModalContainer = ({
    checkedDrawings,
    removeUserDrawingsAccess,
    hideModal
}) => (
    <ConfirmDeleteModal
        handleDelete={() => removeUserDrawingsAccess(checkedDrawings)}
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
    removeUserDrawingsAccess: drawingIDs => {
        dispatch(removeUserDrawingsAccess(drawingIDs));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(RemoveUserDrawingsAccessModalContainer);
