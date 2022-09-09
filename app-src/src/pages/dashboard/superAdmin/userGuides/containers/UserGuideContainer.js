import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchUserGuide from 'actions/superAdmin/userGuides/async/fetchUserGuide';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import UserGuidesPresentational from '../presentational/UserGuidePresentation';
import { UPLOAD_USER_GUIDE } from 'constants/shared/modalTypes';
import { componentDidMount } from 'helpers/generic';
import { RAW_S3_STORAGE_URL } from 'config';
import { usePrevious } from 'helpers/hooks';
import fetchAllUserGuideVersions from 'actions/superAdmin/userGuides/async/fetchAllUserGuideVersions';

const UserGuideContainer = ({
    fetchAllUserGuideVersions,
    showUploadUserGuideModal,
    versions,
    postSuccess,
    isFetching,
    error,
}) => {
    componentDidMount(fetchAllUserGuideVersions);
    const sortedVersions = [...versions].sort((a, b) => a.createdOn - b.createdOn);
    const [latestVersion = {}] = sortedVersions;
    const userguideLink = `${RAW_S3_STORAGE_URL}/${latestVersion.s3Key}`;
    const prevProps = usePrevious({ postSuccess });

    useEffect(() => {
        if (!prevProps.postSuccess && postSuccess) {
            fetchAllUserGuideVersions();
        }
    }, [postSuccess]);
    return (
        <UserGuidesPresentational
            showUploadUserGuideModal={showUploadUserGuideModal}
            versions={sortedVersions}
            userGuideLink={userguideLink}
            isFetching={isFetching}
            error={error}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    fetchUserGuide: () => dispatch(fetchUserGuide()),
    fetchAllUserGuideVersions: () => dispatch(fetchAllUserGuideVersions()),
    showUploadUserGuideModal: () => dispatch(showModal(UPLOAD_USER_GUIDE)),
});

const mapStateToProps = ({
    superAdmin: {
        userGuideReducer: { postSuccess, versions, isFetching, error },
    },
}) => ({
    versions,
    isFetching,
    error,
    postSuccess,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuideContainer);
