import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

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
                <Dropdown
                    placeholder="--- Sort A-Z ---"
                    name="sort"
                    options={sortOptions}
                    selectedOption={selectedOption}
                    handleChange={handleSortChange}
                />
                <p>Sort A-Z:</p>
            </div>
        </form>
    </>
);

export default ApprovedCompaniesFilters;
