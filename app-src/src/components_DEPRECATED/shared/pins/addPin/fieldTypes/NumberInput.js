import React from 'react';
import NumberInputContainer from 'components_DEPRECATED/shared/generic/form/containers/NumberInputContainer';

const NumberInput = ({ isRequired, question: { id, maxNum }, answers, handleChange }) => {
    const [questionValue] = answers[id] || [];
    return (
        <NumberInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={questionValue?.numericValue}
            maxNum={maxNum}
            handleChange={handleChange}
        />
    );
};

export default NumberInput;
