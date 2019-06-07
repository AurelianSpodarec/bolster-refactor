import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';

const DynamicLabelField = ({ labelField, handleChange, questionOptions }) => (
    <Field name="Dynamic fields" sizeClasses="size-lg-6" required>
        <Select
            name="questionUUID"
            options={Object.values(questionOptions)}
            value={labelField.config.questionUUID}
            onChange={handleChange}
            required
        />
    </Field>
);

export default DynamicLabelField;
