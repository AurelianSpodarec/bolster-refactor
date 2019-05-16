import React from 'react';
import Select from 'react-select';

const Dropdown = ({ name, handleChange, options, error, value }) => (
    <>
        <Select
            options={options}
            name={name}
            onChange={handleChange}
            value={value}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default Dropdown;
