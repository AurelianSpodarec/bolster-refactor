import React from 'react';

import ProfileDetailsContainer from '../containers/ProfileDetailsContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Profile = () => {
    return (
        <>
            <PageHeading title="My Profile" />
            <ProfileDetailsContainer />
        </>
    );
};

export default Profile;
