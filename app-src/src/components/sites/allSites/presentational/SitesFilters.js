import React from 'react';

import TextInputContainer from 'components/generic/containers/TextInputContainer';
import Dropdown from 'components/generic/presentational/Dropdown';

const SitesListFilters = ({
    searchTerm,
    statusOptions,
    selectedStatus,
    handleChange
}) => (
    <div>
        <TextInputContainer
            value={searchTerm}
            name="searchTerm"
            placeholder="Search by site name..."
            handleChange={handleChange}
        />
        <Dropdown
            placeholder="All sites"
            name="selectedStatus"
            handleDropdownChange={() => null}
            options={statusOptions}
            selectedOption={selectedStatus}
            handleChange={handleChange}
        />
    </div>
);

export default SitesListFilters;
