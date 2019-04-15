import React from 'react';
import Select from 'react-select';

const MultiDropdown = ({ options, name, handleChange }) => (
    <Select options={options} isMulti name={name} onChange={handleChange} />
);

export default MultiDropdown;
