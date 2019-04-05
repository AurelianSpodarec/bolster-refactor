import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';

const EditOperativePassword = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: 'Operatives' }, { text: 'Edit Password' }]}
        />
        <PageHeading title="Edit Operative" />
        <BlockContainer>
            <EditCompanyUserPasswordFormContainer type="operatives" />
        </BlockContainer>
    </>
);

export default EditOperativePassword;
