import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingEditFormContainer from '../containers/BuildingEditFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const BuildingEdit = ({ buildingName }) => (
    <>
        <PageHeading leftChildren={true} title={`Edit: ${buildingName}`}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Edit Building details" />
            <BuildingEditFormContainer />
        </BlockContainer>
    </>
);
export default BuildingEdit;
