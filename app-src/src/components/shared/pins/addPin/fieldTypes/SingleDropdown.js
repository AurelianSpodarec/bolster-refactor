import React from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { useDropdownOpts } from './helpers';

const SingleDropdown = ({
    isRequired,
    question: { id, options, optionConfigurations },
    answers,
    handleChange,
}) => {
    const opts = useDropdownOpts(options, optionConfigurations);

    const [questionValue] = answers[id] ?? [];
    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={opts}
            value={questionValue?.textValue}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default SingleDropdown;
