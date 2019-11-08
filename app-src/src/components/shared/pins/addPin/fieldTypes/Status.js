import React from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';


const Status = ({ status, handleStatusChange, statusOptions = [] }) => {
    const options = Object.entries(PIN_STATUS_TYPES)
        .filter(([key]) => statusOptions.includes(Number(key)))
        .map(([value, label]) => ({ value, label }));

    return (
        <Select
            placeholder="-- select --"
            name="pinStatus"
            options={options}
            value={status + ''}
            onChange={handleStatusChange}
            required
        />
    );
};

export default Status;