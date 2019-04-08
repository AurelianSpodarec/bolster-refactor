import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';

const EditCompanyAdmin = ({ adminName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                {
                    text: 'All Company Admins',
                    link: '/company/users-management/company-admins'
                },
                { text: `Edit ${adminName}` }
            ]}
        />
        <PageHeading title={`Edit ${adminName}`} />
        <BlockContainer>
            <EditCompanyUserFormContainer />
        </BlockContainer>
    </>
);

export default EditCompanyAdmin;
