import React from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import { useDropdownOpts } from './helpers';

const MultiMulti = ({
    isRequired,
    question: { id, options, optionConfigurations },
    answers,
    handleChange,
}) => {
    const opts = useDropdownOpts(options, optionConfigurations);

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
