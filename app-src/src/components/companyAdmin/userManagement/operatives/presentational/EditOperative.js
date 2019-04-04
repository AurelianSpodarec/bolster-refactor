import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditOperativeFormContainer from '../containers/CreateOperativeFormContainer';

const EditOperative = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: 'All Operatives' },
                { text: 'Edit Operative' }
            ]}
        />
        <PageHeading title="Edit Operative" />
        <BlockContainer>
            <EditOperativeFormContainer />
        </BlockContainer>
    </>
);

export default EditOperative;
