import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

const options = Object.entries(PIN_STATUS_TYPES).map(([value, label]) => ({
    value: +value,
    label
}));

const StatusForm = ({ statusOptions, handleInputChange }) => {
    return (
        <Field name="Status">
            <MultiSelect
                name="statusOptions"
                value={statusOptions}
                options={options}
                onChange={handleInputChange}
                required
            />
        </Field>
    );
};

export default StatusForm;
