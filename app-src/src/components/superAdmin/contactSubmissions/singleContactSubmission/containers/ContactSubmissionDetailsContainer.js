import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { usePrevious } from 'helpers/hooks';

import { DELETE_CONTACT_SUBMISSION, ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ContactSubmissionDetails from '../presentational/ContactSubmissionDetails';

const ContactSubmissionDetailsContainer = ({
    isFetching,
    fetchingError,
    contactSubmission,
    showModal,
    deletionError,
    postSuccess,
    history,
}) => {
    const prevProps = usePrevious({ deletionError });

    useEffect(
        prevProps => {
            if (deletionError && !prevProps.deletionError) {
                showModal(ERROR_MODAL, {
                    title: 'Deletion Error:',
                    message:
                        'An error occurred while deleting this contact submission, please try again later',
                });
            }
            if (postSuccess && !prevProps.postSuccess) {
                history.push('/admin/contact-submissions');
            }
        },
        [deletionError, prevProps.deletionError],
    );

    return (
        <BlockContainer
            isFetching={isFetching}
            error={fetchingError}
            isEmpty={!contactSubmission.id}
        >
            <ContactSubmissionDetails
                contactSubmission={contactSubmission}
                handleShowModal={id => handleShowModal(DELETE_CONTACT_SUBMISSION, { id })}
            />
        </BlockContainer>
    );

    function handleShowModal(id) {
        showModal(DELETE_CONTACT_SUBMISSION, { id });
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
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ContactSubmissionDetailsContainer),
);
