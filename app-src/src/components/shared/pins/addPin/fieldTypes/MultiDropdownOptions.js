import React from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';


const MultiDropdownOptions = ({
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
    
   // ! If a user is editing a pin that has a dropdown option that's no longer available, 
//    this needs to be kept as an option.
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
        <MultiSelect
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
        />
    );
};

export default MultiDropdownOptions;