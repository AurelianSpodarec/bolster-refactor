import React from 'react';
import { connect } from 'react-redux';

import ProfileImage from '../presentational/ProfileImage';

const ProfileImageContainer = ({ profile }) => (
    <ProfileImage profile={profile} />
);

const mapStateToProps = ({
    shared: {
        profileReducer: { profile }
    }
}) => ({
    profile: profile || null
});

export default connect(mapStateToProps)(ProfileImageContainer);
