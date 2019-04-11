import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditProfilePasswordFormContainer from '../containers/EditProfilePasswordFormContainer';

const EditProfilePassword = ({ userName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                {
                    text: 'Profile',
                    link: '/company/profile'
                },
                { text: `Edit ${userName} password` }
            ]}
        />
        <PageHeading title={`Edit ${userName} password`} />
        <BlockContainer>
            <EditProfilePasswordFormContainer />
        </BlockContainer>
    </>
);

export default EditProfilePassword;
