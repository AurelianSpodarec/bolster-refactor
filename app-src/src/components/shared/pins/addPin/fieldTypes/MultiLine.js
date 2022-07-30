import React from 'react';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const MultiLine = ({ isRequired, question: { id, charLimit }, answers, handleChange }) => {
    const [questionValue] = answers[id] ?? [];
    return (
        <TextAreaContainer
            required={isRequired}
            name={`answer-${id}`}
            value={questionValue?.textValue ?? ''}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};

export default MultiLine;
