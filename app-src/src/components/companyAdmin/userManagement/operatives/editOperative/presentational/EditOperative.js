import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';

const EditOperative = ({ operativeName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                {
                    text: 'All Operatives',
                    link: '/company/users-management/company-admins'
                },
                { text: `Edit ${operativeName}` }
            ]}
        />
        <PageHeading title={`Edit ${operativeName}`} />
        <BlockContainer>
            <EditCompanyUserFormContainer />
        </BlockContainer>
    </>
);

export default EditOperative;
