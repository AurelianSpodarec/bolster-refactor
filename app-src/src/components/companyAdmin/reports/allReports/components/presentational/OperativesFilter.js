import React from 'react';
import Select from 'react-select';
import Field from 'components/shared/generic/form/presentational/Field';

const OperativesFilter = ({
    operatives,
    handleChange,
    selectedOperatives,
    required
}) => {
    return (
        <Field name="Operatives">
            <Select
                options={operatives}
                isMulti
                name="selectedOperatives"
                onChange={handleChange}
                value={selectedOperatives}
                required={required}
            />
        </Field>
    );
};

export default OperativesFilter;
