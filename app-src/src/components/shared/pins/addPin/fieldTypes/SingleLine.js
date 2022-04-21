import React from 'react';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const SingleLine = ({ isRequired, question: { id, charLimit }, answers, handleChange }) => {
    const [questionValue] = answers[id] ?? [];
    return (
        <TextInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={questionValue?.textValue ?? ''}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};

export default SingleLine;
