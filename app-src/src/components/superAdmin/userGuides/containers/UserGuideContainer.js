import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchUserGuide from 'actions/superAdmin/userGuides/async/fetchUserGuide';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import UserGuidesPresentational from '../presentational/UserGuidePresentation';
import { UPLOAD_USER_GUIDE } from 'constants/shared/modalTypes';
import { componentDidMount } from 'helpers/generic';
import { RAW_S3_STORAGE_URL } from 'config';
import { usePrevious } from 'helpers/hooks';

const UserGuideContainer = ({
    fetchUserGuide,
    showUploadUserGuideModal,
    userGuide,
    postSuccess,
}) => {
    componentDidMount(fetchUserGuide);

    const userguideLink = `${RAW_S3_STORAGE_URL}/${userGuide.s3Key}`;
    const prevProps = usePrevious({ postSuccess });

    useEffect(() => {
        if (!prevProps.postSuccess && postSuccess) {
            fetchUserGuide();
        }
    }, [postSuccess]);
    return (
        <UserGuidesPresentational
            showUploadUserGuideModal={showUploadUserGuideModal}
            userGuideLink={userguideLink}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    fetchUserGuide: () => dispatch(fetchUserGuide()),
    showUploadUserGuideModal: () => dispatch(showModal(UPLOAD_USER_GUIDE)),
});

const mapStateToProps = ({
    superAdmin: {
        userGuideReducer: { postSuccess, userGuide, isFetching, error },
    },
}) => ({
    userGuide,
    isFetching,
    error,
    postSuccess,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuideContainer);
