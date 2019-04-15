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
    <>
        <Field classes="w-dates" sizeClasses="size-lg-6" name="Start date">
            <DatePicker
                name="startOn"
                selected={startOn}
                onChange={e => onChange(e, 'startOn')}
            />
            {startErrorMessage && startErrorMessage.length && (
                <p className="error red-text text-accent-4">
                    {startErrorMessage}
                </p>
            )}
        </Field>
        <Field classes="w-dates" sizeClasses="size-lg-6" name="End date">
            <DatePicker
                name="endOn"
                selected={endOn}
                onChange={e => onChange(e, 'endOn')}
                placeholderText="click to select a date"
            />
            {endErrorMessage && endErrorMessage.length && (
                <p className="error red-text text-accent-4">
                    {endErrorMessage}
                </p>
            )}
        </Field>
    </>
);

export default AttachDocumentDatePicker;
