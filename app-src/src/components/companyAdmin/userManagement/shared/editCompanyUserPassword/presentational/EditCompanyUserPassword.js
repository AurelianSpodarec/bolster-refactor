import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';

const editCompanyUserPassword = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: 'Company Users' }, { text: 'Edit Password' }]}
        />
        <PageHeading title="Edit Company User Password" />
        <BlockContainer>
            <EditCompanyUserPasswordFormContainer />
        </BlockContainer>
    </>
);

export default editCompanyUserPassword;
