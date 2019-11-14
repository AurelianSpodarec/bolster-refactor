import React from 'react';
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';


const NumberInput = ({
    isRequired,
    question: { id, maxNum },
    answers,
    handleChange
}) =>  (
        <NumberInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            maxNum={maxNum}
            handleChange={handleChange}
        />
    );


export default NumberInput;