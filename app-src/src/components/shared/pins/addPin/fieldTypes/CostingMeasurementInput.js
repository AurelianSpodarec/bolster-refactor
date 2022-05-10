import React from 'react';
import Field from '../../../generic/form/presentational/Field';
import NumberInputContainer from '../../../generic/form/containers/NumberInputContainer';

const CostingMeasurementInput = ({ name, value, handleChange }) => (
    <Field name={name} classes="full-length basic">
        <NumberInputContainer name={name} value={value} handleChange={handleChange} />
    </Field>
);

export default CostingMeasurementInput;
