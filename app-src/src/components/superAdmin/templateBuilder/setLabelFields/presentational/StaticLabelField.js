import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const StaticLabelField = ({ fieldOptions, selectedField, handleChange }) => (
    <Field name="Static fields" sizeClasses="size-lg-6">
        <Dropdown
            name="field"
            options={fieldOptions}
            selectedOption={selectedField}
            handleChange={handleChange}
        />
    </Field>
);

export default StaticLabelField;
