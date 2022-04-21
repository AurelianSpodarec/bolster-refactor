import React, { useMemo } from 'react';
import { componentDidMount } from 'helpers/generic';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';

const Radio = ({
    isRequired,
    question: { id, options, optionConfigurations, defaultValue },
    answers,
    handleChange,
    edit,
}) => {
    const [questionValue] = answers[id] ?? [];
    const opts = useMemo(() => {
        if (!optionConfigurations) return options;

        const enabledOpts = optionConfigurations
            .filter(opt => !opt.isDisabled)
            .map(opt => opt.name);
        return options.filter(opt => enabledOpts.includes(opt.id));
    }, [options, optionConfigurations]);

    componentDidMount(() => {
        if (!questionValue?.textValue && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    });

    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={opts}
            selectedOption={questionValue?.textValue}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

export default Radio;
