import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DatePicker from '../../generic/form/presentational/DatePicker';

const AttachDocumentDatePicker = ({
    startOn,
    endOn,
    startErrorMessage,
    endErrorMessage,
    onChange
}) => (
    <Field
        classes="w-dates"
        sizeClasses="size-lg-12"
        name="Dates available"
        required
    >
        <div className="size-lg-4">
            <DatePicker
                name="startOn"
                selected={startOn}
                onChange={e => onChange(e, 'startOn')}
                placeholderText="Start date (optional)"
                required={false}
            />

            {startErrorMessage && startErrorMessage.length && (
                <p className="error size-lg-12">{startErrorMessage}</p>
            )}
        </div>
        <p className="to size-lg-1">to</p>
        <div className="size-lg-4">
            <DatePicker
                name="endOn"
                selected={endOn}
                onChange={e => onChange(e, 'endOn')}
                placeholderText="End date (optional)"
                required={false}
            />
            {endErrorMessage && endErrorMessage.length && (
                <p className="error size-lg-12">{endErrorMessage}</p>
            )}
        </div>
    </Field>
);

export default AttachDocumentDatePicker;
