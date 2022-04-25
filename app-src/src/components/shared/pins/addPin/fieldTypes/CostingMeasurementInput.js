import React from 'react';
import Field from '../../../generic/form/presentational/Field';
import NumberInputContainer from '../../../generic/form/containers/NumberInputContainer';

const CostingMeasurementInput = ({ unit, name, value, handleChange }) => {
    // todo unit selector dropdown
    return (
        <Field name={name}>
            <NumberInputContainer name={name} value={value} handleChange={handleChange} />
            <span className="unit">{unit}</span>
        </Field>
    );
};

export default CostingMeasurementInput;
