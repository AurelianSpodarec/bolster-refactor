import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';

const EditCompanyAdminPassword = ({ adminName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                {
                    text: 'All Company Admins',
                    link: '/company/users-management/company-admins'
                },
                { text: `Edit ${adminName} password` }
            ]}
        />
        <PageHeading title={`Edit ${adminName} password`} />
        <BlockContainer>
            <EditCompanyUserPasswordFormContainer />
        </BlockContainer>
    </>
);

export default EditCompanyAdminPassword;
