import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorEditFormContainer from '../containers/FloorEditFormContainer';

const FloorEdit = ({ floorName }) => (
    <BlockContainer heading={`Floor: ${floorName}`}>
        <FloorEditFormContainer />
    </BlockContainer>
);
export default FloorEdit;
