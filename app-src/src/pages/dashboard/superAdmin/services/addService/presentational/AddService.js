import React from 'react';

import AddServiceFormContainer from '../containers/AddServiceFormContainer';
import Block from 'components_DEPRECATED/shared/generic/block/presentational/Block';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AddService = () => (
    <>
        <PageHeading title="Add Service" withBackButton />
        <Block>
            <AddServiceFormContainer />
        </Block>
    </>
);

export default AddService;
