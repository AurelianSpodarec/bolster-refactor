import React, { useEffect, useState } from 'react';
import Field from '../../../generic/form/presentational/Field';
import {
    MEASUREMENT_TYPES,
    MEASUREMENT_UNITS,
    UNIT_OPTIONS,
} from '../../../../../constants/companyAdmin/enums';
import CostingMeasurementInput from './CostingMeasurementInput';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
const { LINEAR, CUBIC, DIAMETER, FIXED, NUMBER, SQUARE, VOLUME } = MEASUREMENT_TYPES;
const { MILLIMETRE, MILLILITRE } = MEASUREMENT_UNITS;

const CostingMeasurement = ({
    measurement = {},
    option,
    uid,
    handleChange,
    count = 1,
    showCount = false,
    isFirst = false,
}) => {
    // if (!option || !option.costMeasurementType) return null;
    // todo  default unit type for measurement
    const { fieldNames, defaultUnit, unitType } =
        measurementInfo[option?.costMeasurementType] ?? {};
    const [unit, setUnit] = useState(defaultUnit);
    useEffect(() => {
        setUnit(defaultUnit);
    }, [defaultUnit]);
    if (!fieldNames || !fieldNames.length) return null;
    const name = `${option?.latestVersion.name} ${showCount ? `(${count})` : ''}`;
    return (
        // todo styling
        // todo unit conversions
        <Field name={name} classes={`full-length no-margin-bottom ${isFirst ? 'margin-top' : ''}`}>
            <FlexWrapper justify="between" gap={15}>
                {fieldNames.map(fieldName => {
                    return (
                        <CostingMeasurementInput
                            key={fieldName}
                            name={fieldName}
                            handleChange={(name, value) => handleChange(uid, name, value)}
                            uid={uid}
                            value={measurement[fieldName]}
                        />
                    );
                })}
                <Field forceName classes="full-length basic measurement-unit-field">
                    <Select
                        options={UNIT_OPTIONS[unitType]}
                        value={unit}
                        onChange={(_, val) => setUnit(val)}
                        omitPlaceholder={true}
                        disabled
                    />
                </Field>
            </FlexWrapper>
        </Field>
    );
};

const measurementInfo = {
    [LINEAR]: { fieldNames: ['length'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
    [DIAMETER]: { fieldNames: ['diameter'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
    [SQUARE]: { fieldNames: ['width', 'height'], defaultUnit: MILLIMETRE, unitType: 'DISTANCE' },
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
