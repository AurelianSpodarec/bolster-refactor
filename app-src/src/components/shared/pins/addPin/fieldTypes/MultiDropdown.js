import React, { useMemo } from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { formatDropdownOptions } from 'helpers/general';

const MultiDropdown = ({
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

    // handles if prefilled from a string instead of array
    const value = [].concat(answers[id] || []);
    const optsAnswers = opts.map(({ value }) => value);

    const formattedValue = value
        .map(item => {
            if (optsAnswers.includes(item)) {
                return item;
            }
        })
        .filter(Boolean);

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={formattedValue}
            name={`answer-${id}`}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default MultiDropdown;
