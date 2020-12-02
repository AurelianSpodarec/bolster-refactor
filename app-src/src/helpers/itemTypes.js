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
            isEnabled: option.isEnabled,
        };
    });
};
