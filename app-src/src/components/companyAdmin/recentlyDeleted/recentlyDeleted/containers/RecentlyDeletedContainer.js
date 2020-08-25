import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchRecentlyDeleted from 'actions/companyAdmin/recentlyDeleted/async/fetchRecentlyDeleted';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import RecentlyDeleted from '../presentational/RecentlyDeleted';

class RecentlyDeletedContainer extends Component {
    render() {
        return <RecentlyDeleted />;
    }

    componentDidMount = () => {
        const { fetchRecentlyDeleted } = this.props;

        fetchRecentlyDeleted();
    };

    componentDidUpdate = prevProps => {
        const { isPosting, postSuccess, postFailure, postError, hideModal, showModal } = this.props;

        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }

        if (prevProps.isPosting && !isPosting && postFailure) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: postError,
            });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        deletedDataReducer: { isPosting, postSuccess, postFailure, postError },
    },
}) => ({
    isPosting,
    postSuccess,
    postFailure,
    postError,
});

const mapDispatchToProps = {
    fetchRecentlyDeleted,
    hideModal,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyDeletedContainer);
