import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import GenerationQueueTableContainer from '../containers/GenerationQueueTableContainer';
import GenerationQueueFiltersContainer from '../containers/GenerationQueueFiltersContainer';

const GenerationQueue = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Generation Queue' }]} />
        <PageHeading title="Generation Queue" />
        <BlockContainer>
            <GenerationQueueFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <GenerationQueueTableContainer />
        </BlockContainer>
    </>
);

export default GenerationQueue;
