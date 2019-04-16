import React from 'react';
import Select from 'react-select';

const MultiDropdown = ({ options, name, error, handleChange }) => (
    <>
        <Select options={options} isMulti name={name} onChange={handleChange} />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default MultiDropdown;
