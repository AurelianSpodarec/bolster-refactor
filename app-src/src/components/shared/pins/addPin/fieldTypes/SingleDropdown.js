import React from 'react';
import Select from 'components/shared/generic/form/presentational/Select';


const SingleDropdown = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const opts = options.map(({ id, text }) => ({ value: id, label: text }));

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={opts}
            value={answers[id]}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default SingleDropdown;