import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import UserGuidesPresentational from '../presentational/UserGuidePresentation';
import { UPLOAD_USER_GUIDE } from 'constants/shared/modalTypes';
import fetchUserGuide from 'actions/shared/userGuide/async/fetchUserGuide';
import { componentDidMount } from 'helpers/generic';
import { RAW_S3_STORAGE_URL } from 'config';

const UserGuideContainer = ({ fetchUserGuide, showUploadUserGuideModal, userGuide }) => {
    componentDidMount(fetchUserGuide);

    const userguideLink = `${RAW_S3_STORAGE_URL}/${userGuide.s3Key}`;

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
    shared: {
        userGuideReducer: { userGuide, isFetching, error },
    },
}) => ({
    userGuide,
    isFetching,
    error,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuideContainer);
