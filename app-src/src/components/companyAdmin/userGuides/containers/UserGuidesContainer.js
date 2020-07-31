import React from 'react';
import { connect } from 'react-redux';

import UserGuidesPresentational from '../presentational/UserGuidesPresentational';
import fetchUserGuide from 'actions/shared/userGuide/async/fetchUserGuide';
import { componentDidMount } from 'helpers/generic';
import { RAW_S3_STORAGE_URL } from 'config';

const UserGuideContainer = ({ fetchUserGuide, userGuide }) => {
    componentDidMount(fetchUserGuide);
    const userguideLink = `${RAW_S3_STORAGE_URL}/${userGuide.s3Key}`;
    console.log(userguideLink);
    console.log(userguideLink);
    console.log(userguideLink);
    console.log(userguideLink);
    console.log(userguideLink);

    return <UserGuidesPresentational userGuideLink={userguideLink} />;
};

const mapDispatchToProps = dispatch => ({
    fetchUserGuide: () => dispatch(fetchUserGuide()),
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
