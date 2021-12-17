import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';

import { filterTypeOptions } from './hooks/useOverviewFilters';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';

const BreakdownOverviewFilters = ({
    filterType,
    filterDirection,
    handleChange,
    filterByHasClockedIn,
    setFilterByHasClockedIn,
}) => {
    return (
        <div className="filters">
            <Field name="Sort By">
                <Select
                    name="filterType"
                    value={filterType}
                    options={filterTypeOptions}
                    onChange={handleChange}
                    omitPlaceholder
                />
            </Field>
            <button
                className="button"
                onClick={() => handleChange('filterDirection', filterDirection > 0 ? 0 : 1)}
            >
                <i className={`fas fa-arrow-up ${filterDirection > 0 ? 'asc' : 'desc'}`} />
            </button>

            <Field name="Filter by">
                <div className="size-lg-7">
                    <RadioButton
                        name="filterByHasClockedIn"
                        value={filterByHasClockedIn}
                        checked={filterByHasClockedIn}
                        handleInputChange={(_, val) => setFilterByHasClockedIn(!val)}
                        text="Has Timesheet Data"
                    />
                </div>
                <div className="size-lg-5">
                    <RadioButton
                        name="filterByHasClockedIn"
                        value={filterByHasClockedIn}
                        checked={!filterByHasClockedIn}
                        handleInputChange={(_, val) => setFilterByHasClockedIn(!val)}
                        text="All Users"
                    />
                </div>
            </Field>
        </div>
    );
};

export default BreakdownOverviewFilters;
