import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const ApprovedCompaniesFilters = ({
    handleChange,
    handleSortChange,
    name,
    sortOptions,
    selectedOption
}) => (
    <>
        <form className="table-search size-lg-12">
            <Search
                value={name}
                name="name"
                placeholder="Search by company name or code..."
                handleChange={handleChange}
            />
            <div className="table-filter">
                <Select
                    name="sort"
                    options={sortOptions}
                    value={selectedOption}
                    onChange={handleSortChange}
                    omitPlaceholder
                />
                <p>Sort A-Z:</p>
            </div>
        </form>
    </>
);

export default ApprovedCompaniesFilters;
