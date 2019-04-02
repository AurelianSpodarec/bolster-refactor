import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingEditFormContainer from '../containers/BuildingEditFormContainer';

const BuildingEdit = ({ buildingName }) => (
    <BlockContainer heading={`Building: ${buildingName}`}>
        <BuildingEditFormContainer />
    </BlockContainer>
);
export default BuildingEdit;
