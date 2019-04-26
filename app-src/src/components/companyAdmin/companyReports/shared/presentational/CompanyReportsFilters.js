import React from 'react';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const CompanyReportsFilters = ({
    sortOptions,
    handleChange,
    selectedOption
}) => (
    <form className="table-search in-table">
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

export default CompanyReportsFilters;
