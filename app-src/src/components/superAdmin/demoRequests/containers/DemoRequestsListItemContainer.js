import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL, DELETE_DEMO_REQUEST } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import markDemoRequest from 'actions/superAdmin/demoRequests/async/markDemoRequest';
import DemoRequestsListItem from '../presentational/DemoRequestsListItem';

class DemoRequestsListItemContainer extends Component {
    render() {
        const { demoRequest, colCount } = this.props;
        return (
            <DemoRequestsListItem
                demoRequest={demoRequest}
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

    handleShowModal = demoRequestID => {
        const { showModal } = this.props;
        showModal(DELETE_DEMO_REQUEST, { id: demoRequestID });
    };

    handleMarkContacted = demoRequestID => {
        const { handleMarking } = this.props;
        handleMarking(demoRequestID);
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
    handleMarking: id => dispatch(markDemoRequest(id)),
});

const mapStateToProps = ({ superAdmin: { enquiriesReducer, demoRequestsReducer } }) => ({
    deletionError: enquiriesReducer.deletionError,
    markingError: demoRequestsReducer.markingError,
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoRequestsListItemContainer);
