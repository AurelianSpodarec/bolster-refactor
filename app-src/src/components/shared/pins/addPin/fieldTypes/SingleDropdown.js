import React, { useMemo } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';

const SingleDropdown = ({
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
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={opts}
            value={answers[id]}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default SingleDropdown;
