import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const EditCompanyAdminPassword = () => (
    <>
        <PageHeading
            leftChildren={true}
            title={'Change Company Admin password'}
        >
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer>
            <BlockHeading title="New password" />

            <EditCompanyUserPasswordFormContainer />
        </BlockContainer>
    </>
);

export default EditCompanyAdminPassword;
