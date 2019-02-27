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
            <label>
                <input type="text" value={selectedOption.text} />
                <i className="arrow far fa-chevron-down" />
                <select name={name} onChange={handleChange}>
                    <option value={0}>{placeholder}</option>
                    {options.map(({ text, value }) => (
                        <option
                            key={value}
                            value={value}
                            selected={selectedOption.value === value}
                        >
                            {text}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Dropdown;
