import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const CreateOperative = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'All Operatives' },
                { text: 'Create Operative' }
            ]}
        />
        <PageHeading title="Create Operative" />
        <BlockContainer>
            <p>Create Operative</p>
        </BlockContainer>
    </>
);

export default CreateOperative;
