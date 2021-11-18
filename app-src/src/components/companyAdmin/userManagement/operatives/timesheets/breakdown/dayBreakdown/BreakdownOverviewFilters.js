import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import React from 'react';
import { filterTypeOptions } from './hooks/useOverviewFilters';

const BreakdownOverviewFilters = ({ filterType, filterDirection, handleChange }) => {
    return (
        <div className="filters">
            <Field name="Filter By">
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
                onClick={() => handleChange('filterDirection', filterDirection * -1)}
            >
                <i className={`fas fa-arrow-up ${filterDirection < 0 ? 'desc' : ''}`} />
            </button>
        </div>
    );
};

export default BreakdownOverviewFilters;
