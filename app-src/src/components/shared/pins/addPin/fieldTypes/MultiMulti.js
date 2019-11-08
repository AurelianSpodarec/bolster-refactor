import React from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';



const MultiMulti = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({
        value: id,
        label: text
    }));

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

export default MultiMulti;