export const createPreselectedItemOptionValuesList = optionValuesList => {
    let selectedOptionValues = [];
    Object.values(optionValuesList).forEach(option => {
        if (!option.isDisabled) {
            selectedOptionValues.push(option.id + '');
        }
    });
    return selectedOptionValues;
};

export const formatDropDownOptions = options => {
    return options.map(option => {
        return {
            ...option,
            text: option.name,
            value: option.id,
            isEnabled: option.isEnabled,
        };
    });
};
