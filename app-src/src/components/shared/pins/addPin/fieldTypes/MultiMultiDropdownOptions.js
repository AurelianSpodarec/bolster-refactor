import React, { useEffect } from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import { formatAnswers, getSortedPinOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';
import { useSelector } from 'react-redux';
import CostingMeasurement from './CostingMeasurement';
import { selectPinOptionType } from '../../../../../selectors/companyAdmin/pinOptionTypes';

const MultiMultiDropdownOptions = ({
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
    // todo share component with MultiDropdownOptions
    const questionValue = answers[id] || [];

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
    // ! If a user is editing a pin that has a dropdown option that's no longer available
    // , this needs to be kept as an option.

    const options = getSortedPinOptions(formattedOpts, defaultDropdownSorting);
    const shouldShowCosting = isCostingEnabled && type.hasCosting && !!questionValue?.length;

    const optCounts = {};
    return (
        <>
            <BoundlessSelect
                required={isRequired}
                options={options}
                value={formatAnswers(questionValue, options)}
                name={`answer-${id}`}
                onChange={handleChange}
                search
            />
            {shouldShowCosting &&
                questionValue.map(value => {
                    optCounts[value.pinOptionVersionID] = optCounts[value.pinOptionVersionID]
                        ? optCounts[value.pinOptionVersionID] + 1
                        : 1;
                    return (
                        <CostingMeasurement
                            key={value.uid}
                            count={optCounts[value.pinOptionVersionID]}
                            showCount={true}
                            measurement={measurements[value.uid]}
                            option={pinOptions.find(
                                opt => opt.latestVersion.id === value.pinOptionVersionID,
                            )}
                            uid={value.uid}
                            handleChange={handleMeasurementChange}
                        />
                    );
                })}
        </>
    );
};

export default MultiMultiDropdownOptions;
