import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import GenerationQueueList from '../presentational/GenerationQueueList';

const GenerationQueueTable = ({
    generationQueue,
    headers,
    isFetching,
    error
}) =>
    console.log(generationQueue) || (
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
    );

export default GenerationQueueTable;
