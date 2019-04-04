import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import CreateCompanyAdminFormContainer from '../containers/CreateCompanyAdminFormContainer';

const CreateCompanyAdmin = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'All Company Admins' },
                { text: 'Create Company Admin' }
            ]}
        />
        <PageHeading title="Create Company Admin" />
        <BlockContainer>
            <CreateCompanyAdminFormContainer />
        </BlockContainer>
    </>
);

export default CreateCompanyAdmin;
