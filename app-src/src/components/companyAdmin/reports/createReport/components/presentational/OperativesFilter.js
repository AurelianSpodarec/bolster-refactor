import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const OperativesFilter = ({
    operativeOptions,
    handleChange,
    selectedOperatives,
    sizeClasses,
    isDrawingPage,
}) => {
    return (
        <div className={`${!isDrawingPage ? 'generic-form' : ''} size-lg-12`}>
            <Field name="Operatives" sizeClasses={sizeClasses}>
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
};

export default OperativesFilter;
