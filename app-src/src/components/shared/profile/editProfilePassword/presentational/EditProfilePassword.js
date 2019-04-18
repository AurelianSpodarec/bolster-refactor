import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditProfilePasswordFormContainer from '../containers/EditProfilePasswordFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const EditProfilePassword = () => (
    <>
        <PageHeading leftChildren={true} title="Change Password">
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer>
            <EditProfilePasswordFormContainer />
        </BlockContainer>
    </>
);

export default EditProfilePassword;
