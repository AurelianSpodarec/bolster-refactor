import React from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';


const MultiDropdown = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const opts = options.map(({ id, text }) => ({ value: id, label: text }));

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default MultiDropdown;