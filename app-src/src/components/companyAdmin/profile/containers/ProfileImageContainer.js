import React from 'react';
import { connect } from 'react-redux';

import ProfileImage from '../presentational/ProfileImage';

const ProfileImageContainer = ({ error, isFetching, profile }) => (
    <ProfileImage error={error} isFetching={isFetching} profile={profile} />
);

const mapStateToProps = ({
    shared: {
        profileReducer: { error, isFetching, profile }
    }
}) => ({
    profile: profile || null,
    error,
    isFetching
});

export default connect(mapStateToProps)(ProfileImageContainer);
