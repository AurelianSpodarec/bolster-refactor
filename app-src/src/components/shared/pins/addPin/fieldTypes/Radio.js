import React from 'react';
import { componentDidMount } from 'helpers/generic';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';

const Radio = ({
    isRequired,
    question: { id, options, defaultValue },
    answers,
    handleChange,
    edit
}) => {
    componentDidMount(() => {
        if (!answers[id] && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    });

    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={options}
            selectedOption={answers[id]}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

export default Radio;