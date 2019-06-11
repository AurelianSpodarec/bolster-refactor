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
        <form className="table-search size-lg-12">
            <Search
                value={name}
                name="name"
                placeholder="Search by company name or code..."
                handleChange={handleChange}
            />
            <div className="size-lg-12">
                <MultiSelect
                    name="serviceIDs"
                    options={serviceOptions}
                    value={serviceIDs}
                    onChange={handleChange}
                    placeholder="-- filter by services --"
                />
            </div>
            <div className="size-lg-12">
                <p>Sort A-Z:</p>
                <Select
                    name="sort"
                    options={sortOptions}
                    value={selectedOption}
                    onChange={handleSortChange}
                    omitPlaceholder
                />
            </div>
        </form>
    </>
);

export default ApprovedCompaniesFilters;
