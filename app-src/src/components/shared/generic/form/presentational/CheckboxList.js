import React from 'react';

import CheckboxContainer from '../containers/CheckboxContainer';

const CheckboxList = ({
    options,
    selectedOptions = [],
    handleChange,
    name,
    error,
    classes
}) => (
    <div className={'checkbox-list size-lg-12'}>
        {options &&
            options.map(({ text, value, disabled }) => (
                <CheckboxContainer
                    key={`${text}${value}`}
                    value={value}
                    name={name}
                    text={text}
                    disabled={disabled}
                    checked={
                        selectedOptions.includes(String(value)) && !disabled
                    }
                    handleChange={handleChange}
                    classes={classes}
                    fromList
                />
            ))}
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default CheckboxList;
