import React, { useState } from 'react';
import NumberInputContainer from '../../../generic/form/containers/NumberInputContainer';
import Field from '../../../generic/form/presentational/Field';
import { MEASUREMENT_TYPES } from '../../../../../constants/companyAdmin/enums';
const { LINEAR, CUBIC, DIAMETER, FIXED, NUMBER, SQUARE, VOLUME } = MEASUREMENT_TYPES;

const CostingMeasurement = ({ measurement = {}, option, count = 1, uid, handleChange }) => {
    // if (!option || !option.costMeasurementType) return null;
    // todo useSelector for default unit type
    const defaultUnit = null;
    const [unit, setUnit] = useState(defaultUnit);
    // todo unit selector
    const name = `${option.latestVersion.name} ${count > 1 ? count : ''}`;
    switch (option.costMeasurementType) {
        case LINEAR:
        case DIAMETER:
        default:
            // todo 1 measurement
            return (
                <Field name={name}>
                    <NumberInputContainer
                        name="length"
                        value={measurement.length}
                        handleChange={(name, value) => handleChange(uid, name, value)}
                    />
                </Field>
            );
        case NUMBER:
            // todo
            break;
        case SQUARE:
            // todo 2 measurements

            break;
        case VOLUME:
        case CUBIC:
            // todo 3 measurements
            break;
        case FIXED:
            // todo
            break;
        // todo uncomment
        // default:
        //     return null;
    }
    return (
        <Field name={name}>
            <NumberInputContainer value={measurement.value} />
        </Field>
    );
};

// potential measurement shape:
// {
//     length
//     width
//     height
//     diameter
//     numberValue / count

export default CostingMeasurement;
