import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const OperativesFilter = ({
    operativeOptions,
    handleChange,
    selectedOperatives
}) => (
    <Field name="Operatives">
        <NewSelect
            options={operativeOptions}
            name="companyUserIDs"
            onChange={handleChange}
            placeholder
            value={selectedOperatives}
        />
    </Field>
);

export default OperativesFilter;
