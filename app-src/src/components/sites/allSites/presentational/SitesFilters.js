import React from 'react';

import TextInputContainer from 'components/generic/containers/TextInputContainer';
import Dropdown from 'components/generic/presentational/Dropdown';

const SitesListFilters = ({
    searchTerm,
    statusOptions,
    selectedStatus,
    handleSelectStatus
}) => {
    console.log(selectedStatus);
    return (
        <form>
            <TextInputContainer
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by site name..."
                handleChange={() => null}
            />
            <Dropdown
                placeholder="All sites"
                name="selectedStatus"
                handleDropdownChange={() => null}
                options={statusOptions}
                selectedOption={selectedStatus}
                handleChange={handleSelectStatus}
            />
        </form>
    );
};

export default SitesListFilters;
