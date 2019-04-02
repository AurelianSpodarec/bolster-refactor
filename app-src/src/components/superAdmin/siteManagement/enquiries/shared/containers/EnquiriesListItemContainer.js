import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DELETE_ENQUIRY, POSTING_ERROR } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import EnquiriesListItem from '../presentational/EnquiriesListItem';

class EnquiriesListItemContainer extends Component {
    render() {
        const { enquiry, colCount } = this.props;
        return (
            <EnquiriesListItem
                enquiry={enquiry}
                colCount={colCount}
                handleShowModal={this.handleShowModal}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { postingError, showModal } = this.props;
        if (postingError && !prevProps.postingError) {
            showModal(POSTING_ERROR, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this enquiry, please try again later'
            });
        }
    }

    handleShowModal = enquiry => {
        const { showModal } = this.props;
        showModal(DELETE_ENQUIRY, { id: enquiry.id });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

const mapStateToProps = ({ superAdmin: { enquiriesReducer } }) => ({
    postingError: enquiriesReducer.postingError
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnquiriesListItemContainer);
