import React, { useEffect, useState } from 'react';
import Field from '../../../generic/form/presentational/Field';
import { MEASUREMENT_TYPES, MEASUREMENT_UNITS } from '../../../../../constants/companyAdmin/enums';
import CostingMeasurementInput from './CostingMeasurementInput';
const { LINEAR, CUBIC, RADIUS, FIXED, NUMBER, SQUARE, VOLUME } = MEASUREMENT_TYPES;
const { MILLIMETRE, MILLILITRE } = MEASUREMENT_UNITS;

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
    const { fieldNames, defaultUnit, unitType } =
        measurementInfo[option?.costMeasurementType] ?? {};
    const [unit, setUnit] = useState(defaultUnit);
    useEffect(() => {
        setUnit(defaultUnit);
    }, [defaultUnit]);
    const name = `${option.latestVersion.name} ${showCount ? `(${count})` : ''}`;
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
                        unitType={unitType}
                        setUnit={setUnit}
                        value={measurement[fieldName]}
                    />
                );
            })}
        </Field>
    );
};

const measurementInfo = {
    [LINEAR]: { fieldNames: ['length'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
    [RADIUS]: { fieldNames: ['radius'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
    [SQUARE]: { fieldNames: ['length', 'width'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
    [CUBIC]: {
        fieldNames: ['length', 'width', 'height'],
        defaultUnit: MILLIMETRE,
        unitType: 'DISTANCE',
    },
    [VOLUME]: { fieldNames: ['volume'], defaultUnit: MILLILITRE, unitType: 'VOLUME' },
    [NUMBER]: { fieldNames: [] },
    [FIXED]: { fieldNames: [] },
};

export default CostingMeasurement;
