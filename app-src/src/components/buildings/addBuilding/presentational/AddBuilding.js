import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddBuildingFormContainer from '../containers/AddBuildingFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AddBuilding = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add building' }]} />
        <Block>
            <AddBuildingFormContainer />
        </Block>
    </>
);

export default AddBuilding;
