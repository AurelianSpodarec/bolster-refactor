import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import GenerationQueueTableContainer from '../containers/GenerationQueueTableContainer';

const GenerationQueue = () => (
    <>
        <PageHeading title="Generation Queue">
            <Breadcrumb breadcrumbs={[{ text: 'Generation Queue' }]} />{' '}
        </PageHeading>

        <BlockContainer>
            <GenerationQueueTableContainer />
        </BlockContainer>
    </>
);

export default GenerationQueue;
