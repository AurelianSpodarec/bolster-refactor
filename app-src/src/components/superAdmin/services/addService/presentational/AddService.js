import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddServiceFormContainer from '../containers/AddServiceFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AddService = () => (
    <>
        <PageHeading title="Add Service" withBackButton />
        <Block>
            <AddServiceFormContainer />
        </Block>
    </>
);

export default AddService;
