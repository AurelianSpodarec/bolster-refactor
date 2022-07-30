import React from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { useDropdownOpts } from './helpers';

const MultiDropdown = ({
    isRequired,
    question: { id, options, optionConfigurations },
    answers,
    handleChange,
}) => {
    const opts = useDropdownOpts(options, optionConfigurations);

    const answerValue =
        answers[id]
            ?.map(({ textValue }) => textValue)
            .filter(val => opts.some(opt => opt.value === val)) ?? [];

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={answerValue}
            name={`answer-${id}`}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default MultiDropdown;
