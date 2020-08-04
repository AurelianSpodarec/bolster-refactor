import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_DEMO_REQUEST_COMMENT, ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DemoDetails from '../presentational/DemoDetails';

class DemoDetailsContainer extends Component {
    render() {
        const { isFetching, fetchingError, demoRequests } = this.props;
        return (
            <BlockContainer
                isFetching={isFetching}
                error={fetchingError}
                isEmpty={!demoRequests.id}
            >
                <DemoDetails demoRequests={demoRequests} handleShowModal={this.handleShowModal} />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { commentingError, showModal, commentingSuccess, history } = this.props;
        if (commentingError && !prevProps.commentingError) {
            showModal(ERROR_MODAL, {
                title: 'Save Comments Error:',
                message:
                    'An error occurred while saving this demos comment, please try again later',
            });
        }
        if (commentingSuccess && !prevProps.commentingSuccess) {
            history.push('/admin/demo-requests');
        }
    }

    handleShowModal = (id, comment) => {
        const { showModal } = this.props;
        showModal(ADD_DEMO_REQUEST_COMMENT, { id, comment });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
});

const mapStateToProps = ({ superAdmin: { demoRequestsReducer } }, { match }) => ({
    demoRequests: demoRequestsReducer.demoRequests[match.params.id] || {},
    isFetching: demoRequestsReducer.isFetching,
    fetchingError: demoRequestsReducer.fetchingError,
    commentingError: demoRequestsReducer.commentingError,
    commentingSuccess: demoRequestsReducer.commentingSuccess,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DemoDetailsContainer));
