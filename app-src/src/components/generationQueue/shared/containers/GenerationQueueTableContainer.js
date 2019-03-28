import React from 'react';
import { connect } from 'react-redux';
import GenerationQueueTable from '../presentational/GenerationQueueTable';

const GenerationQueueTableContainer = ({
    isFetching,
    error,
    generationQueue
}) => (
    <GenerationQueueTable
        headers={['Type', 'Details', 'Status', 'Created On', '']}
        isFetching={isFetching}
        error={error}
        generationQueue={generationQueue}
    />
);

const mapStateToProps = ({ generationQueueReducer }) => ({
    generationQueue: Object.values(generationQueueReducer.generationQueue),
    error: generationQueueReducer.error,
    isFetching: generationQueueReducer.isFetching
});

export default connect(mapStateToProps)(GenerationQueueTableContainer);
