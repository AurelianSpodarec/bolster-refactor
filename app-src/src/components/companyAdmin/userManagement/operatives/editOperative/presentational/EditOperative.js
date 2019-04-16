import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditOperative = ({ operativeName }) => (
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
