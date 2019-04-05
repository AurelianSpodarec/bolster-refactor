import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';

const editCompanyAdminPassword = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'Company Admins' },
                { text: 'Edit Password' }
            ]}
        />
        <PageHeading title="Edit Company Admin Password" />
        <BlockContainer>
            <EditCompanyUserPasswordFormContainer type="company-admins" />
        </BlockContainer>
    </>
);

export default editCompanyAdminPassword;
