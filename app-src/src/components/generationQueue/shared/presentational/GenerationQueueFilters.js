import React from 'react';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const GenerationQueueFilters = ({
    sortOptions,
    handleChange,
    selectedOption
}) =>
    console.log(sortOptions, handleChange, selectedOption) || (
        <form className="table-search size-lg-12">
            <div className="table-filter">
                <Dropdown
                    options={sortOptions}
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                    withoutPlaceholder
                />
                <p>Sort by:</p>
            </div>
        </form>
    );

export default GenerationQueueFilters;
