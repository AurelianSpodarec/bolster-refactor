import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import MoveToolBlocksContainer from '../containers/MoveToolBlocksContainer';

const MoveTool = () => (
    <>
        <PageHeading title="Move tool" withBackButton />
        <MoveToolBlocksContainer />
    </>
);

export default MoveTool;
