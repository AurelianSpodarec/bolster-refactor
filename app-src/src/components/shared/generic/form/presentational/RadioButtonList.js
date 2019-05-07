import React from 'react';

import RadioButton from './RadioButton';

const CheckboxList = ({
    options,
    selectedOption,
    handleInputChange,
    name,
    error
}) => (
    <div className="checkbox-list size-lg-12">
        {options &&
            options.map(({ text, id, disabled }) => (
                <RadioButton
                    key={`${text}_${id}`}
                    value={id}
                    name={name}
                    text={text}
                    disabled={disabled}
                    checked={selectedOption === id && !disabled}
                    handleInputChange={handleInputChange}
                />
            ))}
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default CheckboxList;
