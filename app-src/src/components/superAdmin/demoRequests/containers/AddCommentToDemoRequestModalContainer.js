import React from 'react';
import { connect } from 'react-redux';

import ConfirmAddCommentModal from 'components/shared/generic/modals/presentational/ConfirmAddCommentModal';
import addCommentToDemoRequest from 'actions/superAdmin/demoRequests/async/addCommentToDemoRequest';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const AddCommentToDemoRequestModalContainer = ({ id, comment, handleAddComment, hideModal }) => {
    return (
        <ConfirmAddCommentModal
            handleAdd={() => handleAddComment(id, comment)}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message="Are you sure you want to add comment to demo request?"
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleAddComment: (id, comments) => {
        dispatch(addCommentToDemoRequest(id, comments));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(AddCommentToDemoRequestModalContainer);
