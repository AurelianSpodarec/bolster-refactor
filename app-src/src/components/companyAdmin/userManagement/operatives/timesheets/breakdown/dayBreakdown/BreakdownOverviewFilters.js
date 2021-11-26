import Switch from 'components/shared/generic/form/presentational/Switch';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import React from 'react';
import { filterTypeOptions, showOnlyOptions } from './hooks/useOverviewFilters';

const BreakdownOverviewFilters = ({ filterType, filterDirection, handleChange, showOnly }) => {
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
            <Field name="Show Only">
                <Select
                    name="showOnly"
                    value={showOnly}
                    options={showOnlyOptions}
                    onChange={handleChange}
                    omitPlaceholder
                />
            </Field>
            <button
                className="button"
                onClick={() => handleChange('filterDirection', filterDirection * -1)}
            >
                <i className={`fas fa-arrow-up ${filterDirection < 0 ? 'desc' : 'asc'}`} />
            </button>
        </div>
    );
};

export default BreakdownOverviewFilters;
