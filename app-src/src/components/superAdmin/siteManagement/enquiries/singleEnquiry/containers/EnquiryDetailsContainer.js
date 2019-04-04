import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DELETE_ENQUIRY, DELETION_ERROR } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EnquiryDetails from '../presentational/EnquiryDetails';

class EnquiryDetailsContainer extends Component {
    render() {
        const { isFetching, fetchingError, enquiry, showModal } = this.props;
        return (
            <BlockContainer
                isFetching={isFetching}
                error={fetchingError}
                isEmpty={!enquiry.id}
            >
                <EnquiryDetails
                    enquiry={enquiry}
                    handleShowModal={id => showModal(DELETE_ENQUIRY, { id })}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal, postSuccess, history } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(DELETION_ERROR, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this enquiry, please try again later'
            });
        }
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/admin/site-management/user-enquiries');
        }
    }

    handleShowModal = id => {
        const { showModal } = this.props;
        showModal(DELETE_ENQUIRY, { id });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

const mapStateToProps = ({ superAdmin: { enquiriesReducer } }, { match }) => ({
    enquiry: enquiriesReducer.enquiries[match.params.id] || {},
    isFetching: enquiriesReducer.isFetching,
    fetchingError: enquiriesReducer.fetchingError,
    deletionError: enquiriesReducer.deletionError,
    postSuccess: enquiriesReducer.postSuccess
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EnquiryDetailsContainer)
);
