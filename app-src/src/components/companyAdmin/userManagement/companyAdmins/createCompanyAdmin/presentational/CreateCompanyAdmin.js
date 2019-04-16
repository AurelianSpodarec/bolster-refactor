import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CreateCompanyAdminFormContainer from '../containers/CreateCompanyAdminFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateCompanyAdmin = () => (
    <>
        <PageHeading leftChildren={true} title="Create Company Admin">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Company Admin Details" />
            <CreateCompanyAdminFormContainer />
        </BlockContainer>
    </>
);

export default CreateCompanyAdmin;
