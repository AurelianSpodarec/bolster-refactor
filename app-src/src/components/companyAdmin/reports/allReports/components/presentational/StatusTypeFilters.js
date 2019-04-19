import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const StatusTypeFilters = ({ statusOptions, selectedStatus, handleChange }) => (
    <Field name="Status">
        <DropdownContainer
            placeholder="All Status'"
            name="statusID"
            options={statusOptions}
            selectedOption={selectedStatus}
            handleChange={handleChange}
        />
    </Field>
);

export default StatusTypeFilters;
