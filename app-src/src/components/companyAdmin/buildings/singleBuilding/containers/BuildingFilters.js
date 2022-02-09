import React from 'react';

import Select from 'components/shared/generic/form/presentational/Select';

const BuildingFilters = ({
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
            </>
        ) : (
            <>
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
            </>
        )}
    </form>
);

export default BuildingFilters;
