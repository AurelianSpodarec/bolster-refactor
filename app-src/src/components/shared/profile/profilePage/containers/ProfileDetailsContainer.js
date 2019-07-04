import React from 'react';
import { connect } from 'react-redux';

import ProfileDetails from '../presentational/ProfileDetails';

const ProfileDetailsContainer = ({ error, isFetching, profile, onMobile }) => (
    <ProfileDetails
        error={error}
        isFetching={isFetching}
        profile={profile}
        onMobile={onMobile}
    />
);

const mapStateToProps = ({
    shared: {
        profileReducer: { error, isFetching, profile },
        mobileReducer: { onMobile }
    }
}) => ({
    profile: profile || null,
    error,
    onMobile,
    isFetching
});

export default connect(mapStateToProps)(ProfileDetailsContainer);
