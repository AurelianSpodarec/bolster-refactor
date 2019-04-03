import React from 'react';

import Checkbox from './Checkbox';

const CheckboxList = ({
    options,
    selectedOptions,
    handleChange,
    name,
    error
}) => (
    <>
        {options &&
            options.map(({ text, value, disabled }) => (
                <Checkbox
                    key={`${text}${value}`}
                    value={value}
                    name={name}
                    text={text}
                    disabled={disabled}
                    checked={selectedOptions.includes(value + '')}
                    handleChange={handleChange}
                />
            ))}
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default CheckboxList;
