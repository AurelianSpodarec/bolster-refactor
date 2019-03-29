import React from 'react';
import { connect } from 'react-redux';
import GenerationQueueTable from '../presentational/GenerationQueueTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';

const GenerationQueueTableContainer = ({
    isFetching,
    error,
    generationQueue,
    sortString
}) => {
    return (
        <GenerationQueueTable
            headers={['Type', 'Details', 'Status', 'Created On', '']}
            isFetching={isFetching}
            error={error}
            generationQueue={_getSortedQueue()}
        />
    );

    function _getSortedQueue() {
        const [fieldName, sortOrder] = sortString.split(' ');
        return sortArrayByKeyAndOrder(generationQueue, fieldName, sortOrder);
    }
};

const mapStateToProps = ({ generationQueueReducer }) => ({
    generationQueue: Object.values(generationQueueReducer.generationQueue),
    error: generationQueueReducer.error,
    isFetching: generationQueueReducer.isFetching,
    sortString: generationQueueReducer.sort.sortString
});

export default connect(mapStateToProps)(GenerationQueueTableContainer);
