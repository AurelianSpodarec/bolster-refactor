import React, { useEffect } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { getSortedPinOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';
import CostingMeasurement from './CostingMeasurement';
import { useSelector } from 'react-redux';
import { selectPinOptionType } from '../../../../../selectors/companyAdmin/pinOptionTypes';

const DropdownOptions = ({
    isRequired,
    question: { id, defaultValue, optionType },
    answers,
    handleChange,
    edit,
    originalPinOptionAns,
    defaultDropdownSorting,
    companyID,
    pinOptions,
    isCostingEnabled,
    handleMeasurementChange,
    measurements,
    drawing,
}) => {
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    // ! this needs to be kept as an option.
    const questionValue = answers[id] ?? [];

    // todo default value
    useEffect(() => {
        if (!questionValue && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    }, []);

    const type = useSelector(state => selectPinOptionType(state, optionType));
    const formattedOpts = useFilterPinOptions(
        questionValue,
        pinOptions,
        companyID,
        type,
        drawing,
        originalPinOptionAns,
        edit,
    );

    const [firstValue] = questionValue;
    const selected = !firstValue
        ? null
        : pinOptions.find(opt => opt.latestVersion.id === firstValue.pinOptionVersionID);

    const shouldShowCosting = isCostingEnabled && type.hasCosting && !!firstValue;
    return (
        <>
            <Select
                placeholder="-- select --"
                name={`answer-${id}`}
                options={getSortedPinOptions(formattedOpts, defaultDropdownSorting)}
                value={firstValue?.pinOptionVersionID}
                onChange={handleChange}
                required={isRequired}
            />
            {shouldShowCosting && (
                <CostingMeasurement
                    measurement={measurements[firstValue.uid]}
                    option={selected}
                    uid={firstValue.uid}
                    handleChange={handleMeasurementChange}
                />
            )}
        </>
    );
};

export default DropdownOptions;
