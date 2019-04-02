import React from 'react';
import GenerationQueueFilters from '../presentational/GenerationQueueFilters';
import updateGenerationQueueSort from 'actions/companyAdmin/generationQueue/sync/updateGenerationQueueSort';
import { connect } from 'react-redux';

const GenerationQueueFiltersContainer = ({
    updateGenerationQueueSort,
    sortString
}) => {
    const sortOptions = {
        'createdOn asc': {
            text: 'Date (asc)',
            value: 'createdOn asc'
        },
        'createdOn desc': {
            text: 'Date (desc)',
            value: 'createdOn desc'
        }
    };
    return (
        <GenerationQueueFilters
            sortOptions={Object.values(sortOptions)}
            selectedOption={sortOptions[sortString]}
            handleChange={handleChange}
        />
    );

    function handleChange(e) {
        const sortString = e.target.value;
        updateGenerationQueueSort(sortString);
    }
};

const mapDispatchToProps = dispatch => ({
    updateGenerationQueueSort: sortString => {
        dispatch(updateGenerationQueueSort(sortString));
    }
});

const mapStateToProps = ({ superAdmin: { generationQueueReducer } }) => ({
    sortString: generationQueueReducer.sort.sortString
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerationQueueFiltersContainer);
