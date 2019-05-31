import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

const options = Object.entries(PIN_STATUS_TYPES).map(([value, label]) => ({
    value,
    label
}));

const StatusForm = (value, handleInputChange) => (
    <Field name="Status">
        <MultiSelect
            name="status"
            value={value}
            options={options}
            onChange={handleInputChange}
        />
    </Field>
);

export default StatusForm;
