import React from 'react';

import ProfileDetailsContainer from '../containers/ProfileDetailsContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const Profile = () => (
    <>
        <PageHeading title="My Profile" />
        <ProfileDetailsContainer />
    </>
);

export default Profile;
