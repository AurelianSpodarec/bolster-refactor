import React from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserFormContainer from 'pages/dashboard/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';

const EditUsers = () => (
    <>
        <PageHeading leftChildren={true} title={'Edit admin'}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Admin Details" />
            <EditCompanyUserFormContainer />
        </BlockContainer>
    </>
);

export default EditUsers;
