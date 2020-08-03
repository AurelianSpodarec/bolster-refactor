import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DELETE_ENQUIRY, ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import markEnquiry from 'actions/superAdmin/enquiries/async/markEnquiry';
import EnquiriesListItem from '../presentational/EnquiriesListItem';

class EnquiriesListItemContainer extends Component {
    render() {
        const { enquiry, colCount } = this.props;
        return (
            <EnquiriesListItem
                enquiry={enquiry}
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
                message: 'An error occurred while deleting this enquiry, please try again later',
            });
        }

        if (markingError && !prevProps.markingError) {
            showModal(ERROR_MODAL, {
                title: 'Marking as Contacted Error:',
                message:
                    'An error occurred while marking this enquiry as contacted, please try again later',
            });
        }
    }

    handleShowModal = enquiry => {
        const { showModal } = this.props;
        showModal(DELETE_ENQUIRY, { id: enquiry.id });
    };

    handleMarkContacted = id => {
        const { handleMarking } = this.props;
        handleMarking(id);
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
    handleMarking: id => dispatch(markEnquiry(id)),
});

const mapStateToProps = ({ superAdmin: { enquiriesReducer } }) => ({
    deletionError: enquiriesReducer.deletionError,
    markingError: enquiriesReducer.markingError,
});

export default connect(mapStateToProps, mapDispatchToProps)(EnquiriesListItemContainer);
