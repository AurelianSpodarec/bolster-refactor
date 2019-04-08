import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserPasswordFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/containers/EditCompanyUserPasswordFormContainer';

const EditOperativePassword = ({ operativeName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                {
                    text: 'All Operatives',
                    link: '/company/users-management/operatvies'
                },
                { text: `Edit ${operativeName} password` }
            ]}
        />
        <PageHeading title={`Edit ${operativeName} password`} />
        <BlockContainer>
            <EditCompanyUserPasswordFormContainer />
        </BlockContainer>
    </>
);

export default EditOperativePassword;
