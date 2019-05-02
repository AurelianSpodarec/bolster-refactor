import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_STATIC_FIELDS } from 'constants/shared/templateBuilder';

const staticFieldOptions = convertEnumToDropdownOptions(LABEL_STATIC_FIELDS);
const StaticLabelField = ({ labelField, handleChange }) => (
    <Field name="Static fields" sizeClasses="size-lg-6">
        <Dropdown
            name="staticField"
            options={Object.values(staticFieldOptions)}
            selectedOption={staticFieldOptions[labelField.config.staticField]}
            handleChange={handleChange}
            required
        />
    </Field>
);

export default StaticLabelField;
