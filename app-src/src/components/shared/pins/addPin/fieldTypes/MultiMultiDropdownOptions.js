import React from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';


const MultiMultiDropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange,
    edit,
    originalDropdownMultiAns
}) => {

    let formattedOpts = [];
    const filteredOptions = dropdownOptions
            .filter(option => option.type + '' === optionType + '');

    // ! If a user is editing a pin that has a dropdown option that's no longer available
    // , this needs to be kept as an option.
    if(edit) {
        const curOptions = filteredOptions.map(opt => opt.name);

        const extraOptions = originalDropdownMultiAns.reduce((acc, opt) => {
            if(!curOptions.includes(opt) && !acc.includes(opt)) {
                acc.push(opt);
            }
            return acc;
        }, []).map(opt => ({name: opt}));

        formattedOpts = [...filteredOptions, ...extraOptions].map(({ name }) => ({
            value: name,
            label: name
        }));
    } else {
        formattedOpts = filteredOptions
            .map(({ name }) => 
            ({
                value: name,
                label: name
            }));
    }
   
        
    return (
        <BoundlessSelect
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

export default MultiMultiDropdownOptions;