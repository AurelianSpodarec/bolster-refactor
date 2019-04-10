import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import ProfileImageContainer from '../containers/ProfileImageContainer';
import ProfileDetailsContainer from '../containers/ProfileDetailsContainer';

const Profile = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: 'Profile' }]} />
            <ProfileImageContainer />
            <ProfileDetailsContainer />
        </>
    );
};

export default Profile;
