import React from 'react';

import AddBuildingFormContainer from '../containers/CreateBuildingFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const CreateBuilding = () => (
    <>
        <PageHeading leftChildren={true} title="Create Building">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <AddBuildingFormContainer />
        </BlockContainer>
    </>
);

export default CreateBuilding;
