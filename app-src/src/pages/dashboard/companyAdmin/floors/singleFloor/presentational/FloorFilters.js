import React from 'react';

import Select from 'components/shared/generic/form/presentational/Select';

const FloorFilters = ({ statusOptions, filterStatus, handleChange, onMobile }) => (
    <form className="table-search">
        {onMobile ? (
            <>
                <div className="table-filter status-filter">
                    <p>Filter by status:</p>
                    <Select
                        placeholder="All floors"
                        name="status"
                        options={statusOptions}
                        value={filterStatus}
                        onChange={handleChange}
                    />
                </div>
            </>
        ) : (
            <>
                <div className="table-filter status-filter">
                    <Select
                        placeholder="All floors"
                        name="status"
                        options={statusOptions}
                        value={filterStatus}
                        onChange={handleChange}
                    />
                    <p>Filter by status:</p>
                </div>
            </>
        )}
    </form>
);

export default FloorFilters;
