import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditProfileFormContainer from '../containers/EditProfileFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const EditProfile = ({ error, isFetching, profile }) => (
    <>
        <PageHeading leftChildren={true} title="Edit Profile">
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer
            error={error}
            isFetching={isFetching}
            isEmpty={!profile.email}
        >
            <BlockHeading title="Your Details" />
            <EditProfileFormContainer />
        </BlockContainer>
    </>
);
export default EditProfile;
