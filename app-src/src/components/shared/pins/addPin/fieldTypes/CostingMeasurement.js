import React, { useState } from 'react';
import Field from '../../../generic/form/presentational/Field';
import { MEASUREMENT_TYPES } from '../../../../../constants/companyAdmin/enums';
import CostingMeasurementInput from './CostingMeasurementInput';
const { LINEAR, CUBIC, DIAMETER, FIXED, NUMBER, SQUARE, VOLUME } = MEASUREMENT_TYPES;

const CostingMeasurement = ({
    measurement = {},
    option,
    uid,
    handleChange,
    count = 1,
    showCount = false,
}) => {
    // if (!option || !option.costMeasurementType) return null;
    // todo  default unit type for measurement
    const defaultUnit = 'mm'; // should be enum
    const [unit, setUnit] = useState(defaultUnit);
    const name = `${option.latestVersion.name} ${showCount ? `(${count})` : ''}`;
    const { fieldNames } = measurementInfo[option.costMeasurementType] ?? {};
    if (!fieldNames || !fieldNames.length) return null;
    return (
        // todo styling
        <Field name={name}>
            {fieldNames.map(fieldName => {
                return (
                    <CostingMeasurementInput
                        key={fieldName}
                        name={fieldName}
                        handleChange={(name, value) => handleChange(uid, name, value)}
                        uid={uid}
                        unit={unit}
                        value={measurement[fieldName]}
                    />
                );
            })}
        </Field>
    );
};

const measurementInfo = {
    [LINEAR]: { fieldNames: ['length'] },
    [DIAMETER]: { fieldNames: ['length'] },
    [SQUARE]: { fieldNames: ['length', 'width'] },
    [CUBIC]: { fieldNames: ['length', 'width', 'height'] },
    [VOLUME]: { fieldNames: ['length', 'width', 'height'] },
    [NUMBER]: { fieldNames: [] },
    [FIXED]: { fieldNames: [] },
};

export default CostingMeasurement;
