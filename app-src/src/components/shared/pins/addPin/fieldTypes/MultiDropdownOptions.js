import React, { useEffect } from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';
import { formatAnswers, getSortedDropdownOptions } from 'helpers/addPin';

const MultiDropdownOptions = ({
    isRequired,
    question: { id, optionType, defaultValue },
    dropdownOptions,
    answers,
    edit,
    handleChange,
    originalDropdownMultiAns,
    isManufacturingEnabledForDrawing,
    defaultDropdownSorting,
    companyID,
    optionValues,
}) => {
    let isManufacturingEnabledForType = false;
    let formattedOpts = [];
    const value = answers[id];

    useEffect(() => {
        if (!value && !edit && defaultValue) {
            handleChange(null, [defaultValue]);
        }
    }, []);

    const filteredOptions = dropdownOptions.filter(option => {
        if (!value?.includes(option.value) && option.isDeleted) return false;
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

    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    //    this needs to be kept as an option.

    const curOptions = filteredOptions.map(opt =>
        isManufacturingEnabledForType ? opt.id : opt.name,
    );

    const extraOptions = originalDropdownMultiAns
        .filter(opt => !curOptions.includes(opt))
        .reduce((acc, opt) => {
            if (acc.find(option => option.id === opt)) return acc;
            if (typeof opt === 'number') {
                const manOption = Object.values(optionValues).find(
                    manufacturerOptions => manufacturerOptions[opt],
                )?.[opt];
                if (manOption) {
                    acc.push({ id: manOption.id, name: manOption.name });
                }
                return acc;
            }
            if (!acc.find(opt => opt.id === opt)) {
                acc.push({ id: opt, name: opt });
            }
            return acc;
        }, []);

    formattedOpts = [...filteredOptions, ...extraOptions].map(option => ({
        value: isManufacturingEnabledForType ? option.id : option.name,
        label: option.name,
        id: option.id || null,
        sort: option.sort,
        createdOn: option.createdOn,
        manufacturerSort: option.manufacturerSort,
        manufacturerID: option.manufacturerID,
    }));
    const options = getSortedDropdownOptions(formattedOpts, defaultDropdownSorting);
    return (
        <MultiSelect
            required={isRequired}
            options={options}
            value={formatAnswers(value, options)}
            name={`answer-${id}`}
            onChange={handleChange}
        />
    );
};

export default MultiDropdownOptions;
