import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddFloorFormContainer from '../containers/AddFloorFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AddFloor = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add floor' }]} />
        <Block>
            <AddFloorFormContainer />
        </Block>
    </>
);

export default AddFloor;
