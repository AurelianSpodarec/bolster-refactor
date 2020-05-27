import React from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';

const DropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange,
    edit,
    originalDropdownAns,
    isManufacturingEnabledForDrawing,
}) => {
    let isManufacturingEnabledForType = false;
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    // ! this needs to be kept as an option.
    let formattedOpts = [];
    const filteredOptions = dropdownOptions.filter(option => {
        if (option.type + '' === optionType + '') {
            // while filtering check whether manufacturing enabled for specific type
            if (
                isManufacturingEnabledForDrawing &&
                DROPDOWN_OPTION_MANUFACTURER_ENABLED[optionType]
            ) {
                isManufacturingEnabledForType = true;
            }
            return true;
        }
        return false;
    });

    if (edit) {
        // todo change the edit so that it can handle manufacturer pin options
        const curOptions = filteredOptions.map(opt => opt.name);

        formattedOpts = filteredOptions.map(option => ({
            value: option.name,
            label: option.name,
        }));

        if (!curOptions.includes(originalDropdownAns)) {
            formattedOpts.push({ value: originalDropdownAns, label: originalDropdownAns });
        }
    } else {
        formattedOpts = dropdownOptions
            .filter(option => option.type + '' === optionType + '')
            .map(option => ({
                value: isManufacturingEnabledForType ? option.id : option.name,
                label: option.name,
                id: option.id || null,
            }));
    }

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={formattedOpts}
            value={answers[id]}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default DropdownOptions;
