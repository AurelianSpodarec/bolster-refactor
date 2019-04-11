import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditProfileFormContainer from '../containers/EditProfileFormContainer';

const EditProfile = ({ error, isFetching, profile }) => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Profile' }, { text: 'Edit' }]} />
        <BlockContainer
            error={error}
            isFetching={isFetching}
            isEmpty={!profile.email}
            heading="Edit Profile"
        >
            <EditProfileFormContainer />
        </BlockContainer>
    </>
);
export default EditProfile;
