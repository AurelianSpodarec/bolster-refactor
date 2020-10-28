import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const SitesListFilters = ({
    name,
    statusOptions,
    selectedStatus,
    handleChange,
    onMobile,
    sortOptions,
    selectedSort,
}) => (
    <form className="table-search size-lg-12">
        {onMobile ? (
            <>
                <Search
                    value={name}
                    name="name"
                    placeholder="Search by site name..."
                    handleChange={handleChange}
                />
                <div className="table-filter">
                    <p>Filter by status:</p>
                    <Select
                        placeholder="All sites"
                        name="status"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleChange}
                    />
                </div>
                <div className="table-filter">
                    <p>Sort by:</p>
                    <Select
                        name="sortBy"
                        options={sortOptions}
                        value={selectedSort}
                        onChange={handleChange}
                        omitPlaceholder
                    />
                </div>
            </>
        ) : (
            <>
                <Search
                    value={name}
                    name="name"
                    placeholder="Search by site name..."
                    handleChange={handleChange}
                />
                <div className="table-filter">
                    <Select
                        placeholder="All sites"
                        name="status"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleChange}
                    />
                    <p>Filter by status:</p>
                </div>
                <div className="table-filter">
                    <Select
                        name="sortBy"
                        options={sortOptions}
                        value={selectedSort}
                        onChange={handleChange}
                        omitPlaceholder
                    />
                    <p>Sort by:</p>
                </div>
            </>
        )}
    </form>
);

export default SitesListFilters;
