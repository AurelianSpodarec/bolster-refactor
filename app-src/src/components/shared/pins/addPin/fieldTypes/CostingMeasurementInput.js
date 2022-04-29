import React from 'react';
import Field from '../../../generic/form/presentational/Field';
import NumberInputContainer from '../../../generic/form/containers/NumberInputContainer';
import Select from '../../../generic/form/presentational/Select';

const CostingMeasurementInput = ({ unit, name, value, handleChange }) => {
    // todo unit selector dropdown
    return (
        <Field name={name}>
            <div className="costing-input-container">
                <NumberInputContainer
                    name={name}
                    value={value}
                    handleChange={handleChange}
                    classes="costing-input-text"
                />
                <Select
                    classes="costing-input-unit-picker"
                    options={[{ value: 0, label: 'mm' }]}
                    value={0}
                    onChange={() => {}}
                />
            </div>
        </Field>
    );
};

export default CostingMeasurementInput;
