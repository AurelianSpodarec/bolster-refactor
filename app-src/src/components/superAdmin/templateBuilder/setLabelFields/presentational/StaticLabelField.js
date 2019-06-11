import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import { LABEL_STATIC_FIELDS } from 'constants/shared/templateBuilder';
import Select from 'components/shared/generic/form/presentational/Select';

const staticFieldOptions = Object.entries(LABEL_STATIC_FIELDS).map(
    ([value, label]) => ({ value: +value, label })
);
const StaticLabelField = ({ labelField, handleChange }) => (
    <Field name="Static fields" sizeClasses="size-lg-6" required>
        <Select
            name="staticField"
            options={Object.values(staticFieldOptions)}
            value={labelField.config.staticField}
            onChange={handleChange}
            required
        />
    </Field>
);

export default StaticLabelField;
