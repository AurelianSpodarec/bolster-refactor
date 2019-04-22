import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';

const DateFilters = ({ startDateSelected, endDateSelected, handleChange }) => (
    <Field name="Date range" sizeClasses="w-dates size-lg-12">
        <div className="size-lg-5">
            <DatePicker
                name="startDate"
                selected={startDateSelected}
                onChange={e => handleChange(e, 'startDate')}
                placeholderText="Date"
            />
        </div>
        <p className="size-lg-2">to</p>
        <div className="size-lg-5">
            <DatePicker
                name="endDate"
                selected={endDateSelected}
                onChange={e => handleChange(e, 'endDate')}
                placeholderText="Date"
            />
        </div>
    </Field>
);

export default DateFilters;
