import React from 'react';
import { connect } from 'react-redux';

import ProfileDetails from '../presentational/ProfileDetails';

const ProfileDetailsContainer = ({ error, isFetching, profile }) => (
    <ProfileDetails error={error} isFetching={isFetching} profile={profile} />
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

export default connect(mapStateToProps)(ProfileDetailsContainer);
