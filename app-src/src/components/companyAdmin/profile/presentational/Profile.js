import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ProfileImageContainer from '../containers/ProfileImageContainer';

const Profile = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: 'Profile' }]} />
            <ProfileImageContainer />
        </>
    );
};

export default Profile;
