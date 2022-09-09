import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { usePrevious } from 'helpers/hooks';

import {
    DELETE_CONTACT_SUBMISSION,
    ERROR_MODAL,
    ADD_CONTACT_SUBMISSION_COMMENT,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ContactSubmissionDetails from '../presentational/ContactSubmissionDetails';

const ContactSubmissionDetailsContainer = ({
    isFetching,
    fetchingError,
    contactSubmission,
    showModal,
    deletionError,
    history,
    deleteSuccess,
    commentingSuccess,
    commentingError,
}) => {
    const prevProps = usePrevious({
        deletionError,
        deleteSuccess,
        commentingSuccess,
        commentingError,
    });

    useEffect(() => {
        if (!prevProps.deletionError && deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this contact submission, please try again later',
            });
        }
        if (!prevProps.deleteSuccess && deleteSuccess) {
            history.push('/admin/contact-submissions');
        }

        if (!prevProps.commentingError && commentingError) {
            showModal(ERROR_MODAL, {
                title: 'Save Comments Error:',
                message:
                    'An error occurred while saving this contact submissions comment, please try again later',
            });
        }
        if (!prevProps.commentingSuccess && commentingSuccess) {
            history.push('/admin/contact-submissions');
        }
    }, [
        deleteSuccess,
        prevProps.deleteSuccess,
        deletionError,
        prevProps.deletionError,
        commentingSuccess,
        commentingError,
        prevProps.commentingSuccess,
        prevProps.commentingError,
    ]);

    return (
        <BlockContainer
            isFetching={isFetching}
            error={fetchingError}
            isEmpty={!contactSubmission.id}
        >
            <ContactSubmissionDetails
                contactSubmission={contactSubmission}
                handleShowModal={id => handleShowModal({ id })}
                handleCommentModal={handleCommentModal}
            />
        </BlockContainer>
    );

    function handleShowModal({ id }) {
        showModal(DELETE_CONTACT_SUBMISSION, { id });
    }

    function handleCommentModal(id, comment) {
        showModal(ADD_CONTACT_SUBMISSION_COMMENT, { id, comment });
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
});

const mapStateToProps = ({ superAdmin: { contactSubmissionsReducer } }, { match }) => ({
    contactSubmission: contactSubmissionsReducer.contactSubmissions[match.params.id] || {},
    isFetching: contactSubmissionsReducer.isFetching,
    fetchingError: contactSubmissionsReducer.fetchingError,
    deletionError: contactSubmissionsReducer.deletionError,
    postSuccess: contactSubmissionsReducer.postSuccess,
    deleteSuccess: contactSubmissionsReducer.deleteSuccess,
    commentingError: contactSubmissionsReducer.commentingError,
    commentingSuccess: contactSubmissionsReducer.commentingSuccess,
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ContactSubmissionDetailsContainer),
);
