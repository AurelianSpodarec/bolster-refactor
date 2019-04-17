import React from 'react';
import Select from 'react-select';

const MultiDropdown = ({ options, name, error, handleChange, value }) => (
    <>
        <Select
            options={options}
            isMulti
            name={name}
            onChange={handleChange}
            value={value}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default MultiDropdown;
