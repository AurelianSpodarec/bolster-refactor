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
    const opts = useMemo(() => {
        if (!optionConfigurations) return options;

        const enabledOpts = optionConfigurations
            .filter(opt => !opt.isDisabled)
            .map(opt => opt.name);
        const optsFiltered = options.filter(opt => enabledOpts.includes(opt.id));
        return optsFiltered;
    }, [options, optionConfigurations]);

    componentDidMount(() => {
        if (!answers[id] && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    });

    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={opts}
            selectedOption={answers[id]}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

export default Radio;
