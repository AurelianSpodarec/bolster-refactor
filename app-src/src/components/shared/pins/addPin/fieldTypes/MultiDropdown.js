import React from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const MultiDropdown = ({ isRequired, question: { id, options }, answers, handleChange }) => {
    const opts = options.map(({ id, text }) => ({ value: id, label: text }));
    // handles if prefilled from a string instead of array
    const value = [].concat(answers[id] || []);
    const optsAnswers = opts.map(({ value }) => value);

    const formattedValue = value
        .map(item => {
            if (optsAnswers.includes(item)) {
                return item;
            }
        })
        .filter(Boolean);

    console.log('opts', opts);
    console.log('value', value);
    console.log('answers', answers);

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={formattedValue}
            name={`answer-${id}`}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default MultiDropdown;
