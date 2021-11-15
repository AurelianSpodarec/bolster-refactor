import React, { useMemo } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { formatDropdownOptions } from 'helpers/general';

const SingleDropdown = ({
    isRequired,
    question: { id, options, optionConfigurations },
    answers,
    handleChange,
}) => {
    const opts = useMemo(() => {
        if (!optionConfigurations) return formatDropdownOptions(options);

        const enabledOpts = optionConfigurations
            .filter(opt => !opt.isDisabled)
            .map(opt => opt.name);
        const optsFiltered = options.filter(opt => enabledOpts.includes(opt.id));
        return formatDropdownOptions(optsFiltered);
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
