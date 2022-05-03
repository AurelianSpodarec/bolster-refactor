import React, { useEffect } from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { formatAnswers, getSortedPinOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';
import { useSelector } from 'react-redux';
import CostingMeasurement from './CostingMeasurement';
import { selectPinOptionType } from '../../../../../selectors/companyAdmin/pinOptionTypes';

const MultiDropdownOptions = ({
    isRequired,
    question: { id, defaultValue, optionType },
    answers,
    edit,
    handleChange,
    originalPinOptionAns,
    defaultDropdownSorting,
    companyID,
    pinOptions,
    isCostingEnabled,
    handleMeasurementChange,
    measurements,
    drawing,
}) => {
    // todo share component with MultiMultiDropdownOptions
    const questionValue = answers[id];

    useEffect(() => {
        if (!questionValue || (!questionValue.length && !edit && defaultValue)) {
            handleChange(null, [defaultValue]);
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
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    //    this needs to be kept as an option.

    const options = getSortedPinOptions(formattedOpts, defaultDropdownSorting);
    const shouldShowCosting = isCostingEnabled && type.hasCosting && !!questionValue?.length;
    return (
        <>
            <MultiSelect
                required={isRequired}
                options={options}
                value={formatAnswers(questionValue, options)}
                name={`answer-${id}`}
                onChange={handleChange}
            />
            {shouldShowCosting &&
                questionValue.map(value => (
                    <CostingMeasurement
                        key={value.uid}
                        measurement={measurements[value.uid]}
                        option={pinOptions.find(
                            opt => opt.latestVersion.id === value.pinOptionVersionID,
                        )}
                        uid={value.uid}
                        handleChange={handleMeasurementChange}
                    />
                ))}
        </>
    );
};

export default MultiDropdownOptions;
