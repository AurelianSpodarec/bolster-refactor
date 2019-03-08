import React from 'react';

const Dropdown = ({
    placeholder = '--- select an option ---',
    name,
    handleChange,
    options,
    selectedOption = { text: placeholder }
}) => {
    return (
        <div className="custom-dropdown size-lg-12">
            <input type="text" value={selectedOption.text} readOnly />
            <i className="arrow fas fa-caret-down" />
            <select
                name={name}
                onChange={handleChange}
                value={selectedOption.value || 0}
            >
                <option value={0}>{placeholder}</option>
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
