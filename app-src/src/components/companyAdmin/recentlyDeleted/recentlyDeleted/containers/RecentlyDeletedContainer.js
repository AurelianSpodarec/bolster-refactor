import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchRecentlyDeleted from 'actions/companyAdmin/recentlyDeleted/async/fetchRecentlyDeleted';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import RecentlyDeleted from '../presentational/RecentlyDeleted';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

const RecentlyDeletedContainer = ({
    fetchRecentlyDeleted,
    isPosting,
    postSuccess,
    postFailure,
    postError,
    hideModal,
    showModal,
}) => {
    componentDidMount(fetchRecentlyDeleted);

    const prevProps = usePrevious({ isPosting, postSuccess, postFailure });
    useEffect(() => {
        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }

        if (prevProps.isPosting && !isPosting && postFailure) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: postError,
            });
        }
    }, [isPosting, postSuccess, postFailure]);

    return <RecentlyDeleted />;
};

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
