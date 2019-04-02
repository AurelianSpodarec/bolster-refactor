import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddBuildingFormContainer from '../containers/CreateBuildingFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const CreateBuilding = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add building' }]} />
        <Block>
            <AddBuildingFormContainer />
        </Block>
    </>
);

export default CreateBuilding;
