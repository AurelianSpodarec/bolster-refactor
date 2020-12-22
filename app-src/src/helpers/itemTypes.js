export const createPreselectedItemOptionValuesList = optionValues => {
    let selectedOptionValues = [];
    if (optionValues) {
        optionValues.map(value => {
            selectedOptionValues.push(value + '');
        });
    }
    return selectedOptionValues;
};

export const formatDropdownOptions = options => {
    return options.map(option => {
        return {
            ...option,
            text: option.name,
            value: option.id,
            isDisbled: option.isDisabled,
        };
    });
};

export const getPreselectedItemTypes = dropdownOptions => {
    const preselectedDropdowns = [];

    dropdownOptions.forEach(option => {
        !option.isDisabled && preselectedDropdowns.push(String(option.id));
    });
    return preselectedDropdowns;
};
