import React from 'react';

import AddBuildingFormContainer from '../containers/CreateBuildingFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CreateBuilding = () => (
    <>
        <PageHeading
            leftChildren={true}
            title="Create Building"
            withBackButton
        />
        <BlockContainer>
            <AddBuildingFormContainer />
        </BlockContainer>
    </>
);

export default CreateBuilding;
