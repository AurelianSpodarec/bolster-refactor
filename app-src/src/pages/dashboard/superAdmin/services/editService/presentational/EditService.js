import React from 'react';

import Block from 'components_DEPRECATED/shared/generic/block/presentational/Block';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import EditServiceFormContainer from '../containers/EditServiceFormContainer';

const EditService = () => (
    <>
        <PageHeading title="Edit Service" withBackButton />
        <Block>
            <EditServiceFormContainer />
        </Block>
    </>
);

export default EditService;
