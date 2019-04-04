import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';

const EditCompanyAdmin = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'All Company Admins' },
                { text: 'Edit Company Admin' }
            ]}
        />
        <PageHeading title="Edit Company Admin" />
        <BlockContainer>
            <EditCompanyUserFormContainer type="company-admins" />
        </BlockContainer>
    </>
);

export default EditCompanyAdmin;
