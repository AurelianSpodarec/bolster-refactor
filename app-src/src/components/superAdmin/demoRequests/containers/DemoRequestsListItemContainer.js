import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL, DELETE_DEMO_REQUEST } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import DemoRequestsListItem from '../presentational/DemoRequestsListItem';

class DemoRequestsListItemContainer extends Component {
    render() {
        const { demoRequest, colCount } = this.props;
        return (
            <DemoRequestsListItem
                demoRequest={demoRequest}
                colCount={colCount}
                handleShowModal={this.handleShowModal}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this enquiry, please try again later'
            });
        }
    }

    handleShowModal = demoRequestID => {
        const { showModal } = this.props;
        showModal(DELETE_DEMO_REQUEST, { id: demoRequestID });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

const mapStateToProps = ({ superAdmin: { enquiriesReducer } }) => ({
    deletionError: enquiriesReducer.deletionError
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoRequestsListItemContainer);
