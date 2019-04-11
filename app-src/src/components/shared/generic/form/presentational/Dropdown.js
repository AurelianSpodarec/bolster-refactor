import React from 'react';

const Dropdown = ({
    placeholder = '--- select an option ---',
    name,
    handleChange,
    handleFocus = () => {},
    handleBlur = () => {},
    options,
    selectedOption = { text: placeholder },
    withoutPlaceholder = false,
    error,
    disabled = false,
    required = false
}) => {
    console.log(required);
    return (
        <div className="custom-dropdown size-lg-12">
            <input type="text" value={selectedOption.text} readOnly />
            <i className="arrow fas fa-caret-down" />
            {!!(error && error.length) && (
                <p className="error red-text text-accent-4">{error}</p>
            )}
            <select
                name={name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={selectedOption.value || ''}
                disabled={disabled}
                required={required}
            >
                {!withoutPlaceholder && <option value="">{placeholder}</option>}
                {options.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
