import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import GenerationQueueList from '../presentational/GenerationQueueList';
import GenerationQueueFiltersContainer from '../containers/GenerationQueueFiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const GenerationQueueTable = ({
    generationQueue,
    headers,
    isFetching,
    error
}) => (
    <>
        <BlockHeading title="Generation Queue Table">
            <GenerationQueueFiltersContainer />
        </BlockHeading>

        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!generationQueue.length}
            noDataMessage="Generation queue is empty"
        >
            <GenerationQueueList generationQueue={generationQueue} />
        </Table>
    </>
);

export default GenerationQueueTable;
