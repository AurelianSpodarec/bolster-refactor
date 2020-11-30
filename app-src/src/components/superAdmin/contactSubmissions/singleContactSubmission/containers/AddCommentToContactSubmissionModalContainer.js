import React from 'react';
import { connect } from 'react-redux';

import ConfirmAddCommentModal from 'components/shared/generic/modals/presentational/ConfirmAddCommentModal';
import addContactSubmissionComment from 'actions/superAdmin/contactSubmissions/async/addCommentToContactSubmission';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const addCommentToContactSubmissionModalContainer = ({
    id,
    comment,
    handleAddComment,
    hideModal,
}) => {
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
        dispatch(addContactSubmissionComment(id, comments));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(addCommentToContactSubmissionModalContainer);
