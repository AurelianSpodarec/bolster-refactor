import React from 'react';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const MultiLine = ({
    isRequired,
    question: { id, charLimit },
    answers,
    handleChange
}) => {
    return (
        <TextAreaContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};

export default MultiLine;