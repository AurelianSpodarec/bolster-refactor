import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const OperativesFilter = ({
    operativeOptions,
    handleChange,
    selectedOperatives
}) => (
    <div className="generic-form">
        <Field name="Operatives">
            <NewSelect
                options={operativeOptions}
                name="companyUserIDs"
                onChange={handleChange}
                value={selectedOperatives}
            />
        </Field>
    </div>
);

export default OperativesFilter;
