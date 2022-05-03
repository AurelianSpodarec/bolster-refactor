import React from 'react';
import Field from '../../../generic/form/presentational/Field';
import NumberInputContainer from '../../../generic/form/containers/NumberInputContainer';
import Select from '../../../generic/form/presentational/Select';
import { UNIT_OPTIONS } from '../../../../../constants/companyAdmin/enums';

const CostingMeasurementInput = ({ unit, unitType, setUnit, name, value, handleChange }) => {
    // todo unit conversions
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
                    options={UNIT_OPTIONS[unitType]}
                    value={unit}
                    onChange={(_, val) => setUnit(val)}
                    omitPlaceholder={true}
                />
            </div>
        </Field>
    );
};

export default CostingMeasurementInput;
