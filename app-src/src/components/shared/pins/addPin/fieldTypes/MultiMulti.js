import React, { useMemo } from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';

const MultiMulti = ({
    isRequired,
    question: { id, options, optionConfigurations },
    answers,
    handleChange,
}) => {
    const opts = useMemo(() => {
        const enabledOpts = optionConfigurations
            .filter(opt => !opt.isDisabled)
            .map(opt => opt.name);
        const optsFiltered = options.filter(opt => enabledOpts.includes(opt.id));
        const optsForDropdown = optsFiltered.map(({ id, text }) => ({ value: id, label: text }));
        return optsForDropdown;
    }, [options, optionConfigurations]);

    return (
        <BoundlessSelect
            required={isRequired}
            options={opts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

export default MultiMulti;
