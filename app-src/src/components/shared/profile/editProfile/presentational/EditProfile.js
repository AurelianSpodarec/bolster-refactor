import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditProfileFormContainer from '../containers/EditProfileFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditProfile = ({ error, isFetching, profile }) => (
    <>
        <PageHeading title="Edit Profile">
            <Breadcrumb
                breadcrumbs={[
                    { text: 'My Profile', link: '/company/profile' },
                    { text: 'Edit Profile' }
                ]}
            />
        </PageHeading>

        <BlockContainer
            error={error}
            isFetching={isFetching}
            isEmpty={!profile.email}
        >
            <BlockHeading title="Edit Details" />
            <EditProfileFormContainer />
        </BlockContainer>
    </>
);
export default EditProfile;
