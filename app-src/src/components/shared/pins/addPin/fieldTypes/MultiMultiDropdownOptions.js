import React, { useEffect } from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';
import { getSortedDropdownOptions } from 'helpers/addPin';

const MultiMultiDropdownOptions = ({
    isRequired,
    question: { id, optionType, optionDefaultValue },
    dropdownOptions,
    answers,
    handleChange,
    edit,
    originalDropdownMultiAns,
    isManufacturingEnabledForDrawing,
    defaultDropdownSorting,
}) => {
    let isManufacturingEnabledForType = false;
    let formattedOpts = [];

    useEffect(() => {
        if (!answers[id] && !edit && optionDefaultValue) {
            handleChange(null, [optionDefaultValue]);
        }
    }, []);

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

    // ! If a user is editing a pin that has a dropdown option that's no longer available
    // , this needs to be kept as an option.
    if (edit) {
        // todo change the edit so that it can handle manufacturer pin options

        const curOptions = filteredOptions.map(opt =>
            isManufacturingEnabledForType ? opt.id : opt.name,
        );

        const extraOptions = originalDropdownMultiAns
            .reduce((acc, opt) => {
                if (!curOptions.includes(opt) && !acc.includes(opt)) {
                    acc.push(opt);
                }
                return acc;
            }, [])
            .map(opt => ({ name: opt, id: opt }));

        formattedOpts = [...filteredOptions, ...extraOptions].map(option => ({
            value: isManufacturingEnabledForType ? option.id : option.name,
            label: option.name,
            id: option.id || null,
            sort: option.sort,
            createdOn: option.createdOn,
            manufacturerSort: option.manufacturerSort,
            manufacturerID: option.manufacturerID,
        }));
    } else {
        formattedOpts = filteredOptions.map(option => ({
            value: isManufacturingEnabledForType ? option.id : option.name,
            label: option.name,
            id: option.id || null,
            sort: option.sort,
            createdOn: option.createdOn,
            manufacturerSort: option.manufacturerSort,
            manufacturerID: option.manufacturerID,
        }));
    }

    const options = getSortedDropdownOptions(formattedOpts, defaultDropdownSorting);

    return (
        <BoundlessSelect
            required={isRequired}
            options={options}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

export default MultiMultiDropdownOptions;
