import React from 'react';

const Dropdown = ({
    placeholder = '--- select an option ---',
    name,
    handleChange,
    options,
    selectedOption = { text: placeholder },
    withPlaceholder = true,
    error
}) => {
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
                value={selectedOption.value || ''}
            >
                {withPlaceholder && <option value="">{placeholder}</option>}
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
