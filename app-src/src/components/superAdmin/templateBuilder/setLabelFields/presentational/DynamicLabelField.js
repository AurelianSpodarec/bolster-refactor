import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DynamicLabelField = () => (
    <Field name="Dynamic fields" sizeClasses="size-lg-6">
        <Dropdown name="field" options={[]} />
    </Field>
);

export default DynamicLabelField;
