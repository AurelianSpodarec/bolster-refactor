import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DynamicLabelField = ({ labelField, handleChange, questionOptions }) => (
    <Field name="Static fields" sizeClasses="size-lg-6">
        <Dropdown
            name="questionUUID"
            options={Object.values(questionOptions)}
            selectedOption={questionOptions[labelField.config.questionUUID]}
            handleChange={handleChange}
            required
        />
    </Field>
);

export default DynamicLabelField;
