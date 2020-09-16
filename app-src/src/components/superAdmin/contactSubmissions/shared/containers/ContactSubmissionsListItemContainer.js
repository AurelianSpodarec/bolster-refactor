import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    DELETE_CONTACT_SUBMISSION,
    DELETE_ENQUIRY,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import markContactSubmission from 'actions/superAdmin/contactSubmissions/async/markContactSubmission';
import ContactSubmissionsListItem from '../presentational/ContactSubmissionsListItem';

class ContactSubmissionsListItemContainer extends Component {
    render() {
        const { contactSubmission, colCount } = this.props;

        return (
            <ContactSubmissionsListItem
                contactSubmission={contactSubmission}
                colCount={colCount}
                handleShowModal={this.handleShowModal}
                handleMarkContacted={this.handleMarkContacted}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, markingError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this contact submission, please try again later',
            });
        }

        if (markingError && !prevProps.markingError) {
            showModal(ERROR_MODAL, {
                title: 'Marking as Contacted Error:',
                message:
                    'An error occurred while marking this contact submission as contacted, please try again later',
            });
        }
    }

    handleShowModal = contactSubmission => {
        const { showModal } = this.props;
        showModal(DELETE_CONTACT_SUBMISSION, { id: contactSubmission.id });
    };

    handleMarkContacted = id => {
        const { handleMarking } = this.props;
        handleMarking(id);
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
    handleMarking: id => dispatch(markContactSubmission(id)),
});

const mapStateToProps = ({ superAdmin: { contactSubmissionsReducer } }) => ({
    deletionError: contactSubmissionsReducer.deletionError,
    markingError: contactSubmissionsReducer.markingError,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSubmissionsListItemContainer);
