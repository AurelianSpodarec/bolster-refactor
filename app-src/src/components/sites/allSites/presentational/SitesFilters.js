import React from 'react';

import TextInputContainer from 'components/generic/containers/TextInputContainer';
import Dropdown from 'components/generic/presentational/Dropdown';

const SitesListFilters = ({
    searchTerm,
    statusOptions,
    selectedStatus,
    handleSearchTermChange,
    handleSelectStatus
}) => (
    <form>
        <TextInputContainer
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
