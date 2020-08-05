import React from 'react';
import { connect } from 'react-redux';

import UserGuidesPresentational from '../presentational/UserGuidesPresentational';
import fetchUserGuide from 'actions/companyAdmin/userGuide/async/fetchUserGuide';
import { componentDidMount } from 'helpers/generic';
import { RAW_S3_STORAGE_URL } from 'config';

const UserGuideContainer = ({ fetchUserGuide, userGuide, isFetching, error }) => {
    componentDidMount(fetchUserGuide);
    const userguideLink = `${RAW_S3_STORAGE_URL}/${userGuide.s3Key}`;

    return <UserGuidesPresentational userGuideLink={userguideLink} isFetching={isFetching} error={error} />;
};

const mapDispatchToProps = { fetchUserGuide };

const mapStateToProps = ({
    companyAdmin: {
        userGuideReducer: { userGuide, isFetching, error },
    },
}) => ({
    userGuide,
    isFetching,
    error,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuideContainer);
