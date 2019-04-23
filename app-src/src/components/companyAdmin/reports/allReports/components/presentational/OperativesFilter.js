import React from 'react';
import Select from 'react-select';
import Field from 'components/shared/generic/form/presentational/Field';

const OperativesFilter = ({ operatives, handleChange, selectedOperatives }) => {
    return (
        <Field name="Operatives">
            <Select
                options={operatives}
                isMulti
                name="selectedOperatives"
                onChange={handleChange}
                value={selectedOperatives}
            />
        </Field>
    );
};

export default OperativesFilter;
