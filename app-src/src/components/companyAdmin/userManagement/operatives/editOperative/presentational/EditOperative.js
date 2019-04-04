import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditCompanyUserFormContainer from 'components/companyAdmin/userManagement/shared/editCompanyUser/containers/EditCompanyUserFormContainer';

const EditOperative = ({ handleSubmit, userID }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'All Operatives' },
                { text: 'Edit Operative' }
            ]}
        />
        <PageHeading title="Edit Operative" />
        <BlockContainer>
            <EditCompanyUserFormContainer
                handleSubmit={handleSubmit}
                userID={userID}
            />
        </BlockContainer>
    </>
);

export default EditOperative;
