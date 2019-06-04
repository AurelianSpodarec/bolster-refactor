import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const OperativesFilter = ({
    operativeOptions,
    handleChange,
    selectedOperatives
}) => (
    <div className="generic-form">
        <Field name="Operatives">
            <MultiSelect
                options={operativeOptions}
                name="companyUserIDs"
                onChange={handleChange}
                value={selectedOperatives}
                search
                placeholder="All Operatives"
            />
        </Field>
    </div>
);

export default OperativesFilter;
