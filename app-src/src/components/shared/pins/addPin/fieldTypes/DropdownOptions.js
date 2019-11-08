import React from 'react';
import Select from 'components/shared/generic/form/presentational/Select';


const DropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange,
    edit,
    originalDropdownAns
}) => {
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    // ! this needs to be kept as an option.
    let formattedOpts = [];
    const filteredOptions = dropdownOptions
        .filter(option => option.type + '' === optionType + '');

    if(edit) {
        const curOptions = filteredOptions.map(opt => opt.name);
 
        formattedOpts = filteredOptions.map(({ name }) => ({
            value: name,
            label: name
        }));
        
        if(!curOptions.includes(originalDropdownAns)) {
            formattedOpts.push({value: originalDropdownAns, label: originalDropdownAns});
        }
    } else {
        formattedOpts = dropdownOptions
            .filter(option => option.type + '' === optionType + '')
            .map(({ name }) => ({ value: name, label: name }));
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