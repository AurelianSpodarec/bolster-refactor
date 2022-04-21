import React, { useEffect } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';
import { getSortedDropdownOptions } from 'helpers/addPin';

const DropdownOptions = ({
    isRequired,
    question: { id, optionType, defaultValue, pinOptionTypeID },
    dropdownOptions,
    answers,
    handleChange,
    edit,
    originalDropdownAns,
    isManufacturingEnabledForDrawing,
    defaultDropdownSorting,
    companyID,
    optionValues,
    pinOptions,
}) => {
    let isManufacturingEnabledForType = false;
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    // ! this needs to be kept as an option.
    let formattedOpts = [];
    const [questionValue] = answers[id] ?? [];

    // todo default value
    useEffect(() => {
        if (!questionValue && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    }, []);

    // for edit only
    const filteredOptions = dropdownOptions.filter(option => {
        // remove deleted option if not already selected
        if (value !== option.value && option.isDeleted) return false;
        if (option.companyID !== companyID && option.companyID !== null) {
            return false;
        }
        if (option.type + '' === optionType + '') {
            // while filtering check whether manufacturing enabled for specific type
            if (
                isManufacturingEnabledForDrawing &&
                DROPDOWN_OPTION_MANUFACTURER_ENABLED[optionType]
            ) {
                if (option.isManufacturerDeleted) return false;

                isManufacturingEnabledForType = true;
            }
            return true;
        }
        return false;
    });

    if (edit) {
        const curOptions = filteredOptions.map(opt =>
            isManufacturingEnabledForType ? opt.id : opt.name,
        );

        formattedOpts = filteredOptions.map(option => ({
            value: isManufacturingEnabledForType ? option.id : option.name,
            label: option.name,
            id: option.id || null,
            sort: option.sort,
            createdOn: option.createdOn,
            manufacturerSort: option.manufacturerSort,
            manufacturerID: option.manufacturerID,
        }));

        if (!curOptions.includes(originalDropdownAns)) {
            if (typeof originalDropdownAns === 'number') {
                const manOption = Object.values(optionValues).find(
                    manufacturerOptions => manufacturerOptions[originalDropdownAns],
                )?.[originalDropdownAns];
                if (manOption) {
                    formattedOpts.push({ value: originalDropdownAns, label: manOption.name });
                }
            } else {
                formattedOpts.push({ value: originalDropdownAns, label: originalDropdownAns });
            }
        }
    } else {
        formattedOpts = pinOptions
            // todo uncomment when question has type
            // .filter(option => option.pinOptionTypeID === pinOptionTypeID)
            .map(option => ({
                value: option.latestVersion.id,
                label: option.latestVersion.name,
                id: option.latestVersion.id,
                sort: option.sort,
                createdOn: option.createdOn,
            }));
    }
    // todo figure out value / handlechange

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={getSortedDropdownOptions(formattedOpts, defaultDropdownSorting)}
            value={questionValue?.pinOptionVersionID}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default DropdownOptions;
