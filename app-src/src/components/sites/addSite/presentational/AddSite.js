import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddSiteFormContainer from '../containers/AddSiteFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AddSite = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'Sites', link: '/sites' },
                { text: 'Add site' }
            ]}
        />
        <BlockContainer heading="Add Site">
            <AddSiteFormContainer />
        </BlockContainer>
    </>
);

export default AddSite;
