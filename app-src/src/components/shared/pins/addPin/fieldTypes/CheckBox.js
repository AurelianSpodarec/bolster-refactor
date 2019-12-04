import React from 'react';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';


const CheckBox = ({ isRequired, question: { id }, answers, handleChange }) => {
    return (
        <CheckboxContainer
            required={isRequired}
            checked={answers[id] || false}
            name={`answer-${id}`}
            text=""
            handleChange={handleChange}
        />
    );
};

export default CheckBox;