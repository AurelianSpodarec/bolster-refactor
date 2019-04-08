import React from 'react';

import Checkbox from './Checkbox';

const CheckboxList = ({
    options,
    selectedOptions,
    handleChange,
    name,
    error
}) => (
    <div className="checkbox-list size-lg-12">
        {options &&
            options.map(({ text, value, disabled }) => (
                <Checkbox
                    key={`${text}${value}`}
                    value={value}
                    name={name}
                    text={text}
                    disabled={disabled}
                    checked={selectedOptions.includes(value + '') && !disabled}
                    handleChange={handleChange}
                />
            ))}
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default CheckboxList;
