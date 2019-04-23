import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import GenerationQueueTableContainer from '../containers/GenerationQueueTableContainer';

const GenerationQueue = () => (
    <>
        <PageHeading title="Reports" />

        <BlockContainer>
            <GenerationQueueTableContainer />
        </BlockContainer>
    </>
);

export default GenerationQueue;
