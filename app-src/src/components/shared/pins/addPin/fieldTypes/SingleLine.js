import React from 'react';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const SingleLine = ({
    isRequired,
    question: { id, charLimit },
    answers,
    handleChange
}) => {
    return (
        <TextInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};

export default SingleLine;