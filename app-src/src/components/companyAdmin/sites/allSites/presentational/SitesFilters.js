import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const SitesListFilters = ({
    name,
    statusOptions,
    selectedStatus,
    handleChange,
    onMobile
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
                    <Dropdown
                        placeholder="All sites"
                        name="status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
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
                    <Dropdown
                        placeholder="All sites"
                        name="status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                    <p>Filter by status:</p>
                </div>{' '}
            </>
        )}
    </form>
);

export default SitesListFilters;
