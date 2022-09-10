import React from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserFormContainer from 'pages/dashboard/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const EditOperative = () => (
    <>
        <PageHeading leftChildren={true} title={'Edit Operative'}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Operative details" />
            <EditCompanyUserFormContainer />
        </BlockContainer>
    </>
);

export default EditOperative;
