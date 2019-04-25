import React from 'react';

import ProfileDetailsContainer from '../containers/ProfileDetailsContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Profile = () => (
    <>
        <PageHeading title="My Profile" withBackButton />
        <ProfileDetailsContainer />
    </>
);

export default Profile;
