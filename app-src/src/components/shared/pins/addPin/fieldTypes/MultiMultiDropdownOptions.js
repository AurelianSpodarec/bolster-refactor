import React, { useEffect } from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import { formatAnswers, getSortedDropdownOptions } from 'helpers/addPin';
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
    // todo
    isCostingEnabled = true,
    handleMeasurementChange,
    measurements,
    drawing,
}) => {
    // todo share component with MultiDropdownOptions
    let formattedOpts = [];
    const questionValue = answers[id];

    useEffect(() => {
        if (!questionValue || (!questionValue.length && !edit && defaultValue)) {
            handleChange(null, [defaultValue]);
        }
    }, []);

    const type = useSelector(state => selectPinOptionType(state, optionType));

    const filteredOptions = useFilterPinOptions(
        questionValue,
        pinOptions,
        companyID,
        type,
        drawing,
    );
    // ! If a user is editing a pin that has a dropdown option that's no longer available
    // , this needs to be kept as an option.
    if (edit) {
        const curOptions = filteredOptions.map(opt => opt.id);

        formattedOpts = filteredOptions.map(option => ({
            value: option.id,
            label: option.name,
            id: option.id,
            sort: option.sort,
            createdOn: option.createdOn,
        }));
        // todo tidy
        Object.values(originalPinOptionAns ?? {}).forEach(ans => {
            if (!curOptions.includes(ans.pinOptionVersionID)) {
                let version;
                const optionWithVersion = pinOptions.find(opt => {
                    version = opt.versions.find(vers => vers.id === ans.pinOptionVersionID);
                    return !!version;
                });
                if (optionWithVersion) {
                    const isOtherVersionPresent = optionWithVersion.versions.some(vers =>
                        curOptions.includes(vers.id),
                    );
                    if (!isOtherVersionPresent) {
                        formattedOpts.push({
                            value: version.id,
                            label: version.name,
                            id: version.id,
                            sort: version.sort,
                            createdOn: version.createdOn,
                        });
                    }
                }
            }
        });
    } else {
        formattedOpts = filteredOptions.map(option => ({
            value: option.latestVersion.id,
            label: option.latestVersion.name,
            id: option.latestVersion.id,
            sort: option.sort,
            createdOn: option.createdOn,
        }));
    }
    const options = getSortedDropdownOptions(formattedOpts, defaultDropdownSorting);
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
