import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const ApprovedCompaniesFilters = ({
    handleChange,
    handleSortChange,
    name,
    sortOptions,
    selectedOption,
    serviceOptions,
    serviceIDs
}) => (
    <>
        <form className="table-search larger-search size-lg-12">
            <Search
                value={name}
                name="name"
                placeholder="Search by company name or code..."
                handleChange={handleChange}
            />

            <div className="table-filter auto">
                <Select
                    name="sort"
                    options={sortOptions}
                    value={selectedOption}
                    onChange={handleSortChange}
                    omitPlaceholder
                />
                <p>Sort A-Z:</p>
            </div>
            <div className="table-filter auto">
                <MultiSelect
                    name="serviceIDs"
                    options={serviceOptions}
                    value={serviceIDs}
                    onChange={handleChange}
                    placeholder="-- filter by services --"
                />
                <p>Filter by service:</p>
            </div>
        </form>
    </>
);

export default ApprovedCompaniesFilters;
