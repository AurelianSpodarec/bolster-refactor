import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddServiceFormContainer from '../containers/AddServiceFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AddService = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add service' }]} />
        <Block>
            <AddServiceFormContainer />
        </Block>
    </>
);

export default AddService;
