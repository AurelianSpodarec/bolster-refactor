import React from 'react';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const CheckBox = ({ isRequired, question: { id }, answers, handleChange }) => {
    const [questionValue] = answers[id] ?? [];
    return (
        <CheckboxContainer
            required={isRequired}
            checked={questionValue?.booleanValue ?? false}
            name={`answer-${id}`}
            text=""
            handleChange={handleChange}
        />
    );
};

export default CheckBox;
