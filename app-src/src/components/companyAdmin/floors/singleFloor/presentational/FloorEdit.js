import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorEditFormContainer from '../containers/FloorEditFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const FloorEdit = ({ floorName }) => (
    <>
        <PageHeading leftChildren={true} title={`Edit: ${floorName}`}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Edit Floor" />
            <FloorEditFormContainer />
        </BlockContainer>
    </>
);
export default FloorEdit;
