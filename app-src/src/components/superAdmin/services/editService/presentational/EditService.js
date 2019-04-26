import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
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
