export const createPreselectedItemOptionValuesList = optionValuesList => {
    let selectedOptionValues = [];
    Object.values(optionValuesList).forEach(option => {
        if (!option.isDisabled) {
            selectedOptionValues.push(option.id + '');
        }
    });
    return selectedOptionValues;
};
