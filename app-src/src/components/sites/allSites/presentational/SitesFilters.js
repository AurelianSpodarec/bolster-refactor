import React from 'react';

import Search from 'components/generic/presentational/Search';
import Dropdown from 'components/generic/presentational/Dropdown';

const SitesListFilters = ({
    searchTerm,
    statusOptions,
    selectedStatus,
    handleSearchTermChange,
    handleSelectStatus
}) => (
    <form>
        <Search
            value={searchTerm}
            name="searchTerm"
            placeholder="Search by site name..."
            handleChange={handleSearchTermChange}
        />
        <Dropdown
            placeholder="All sites"
            name="selectedStatus"
            options={statusOptions}
            selectedOption={selectedStatus}
            handleChange={handleSelectStatus}
        />
    </form>
);

export default SitesListFilters;
