import React from 'react';

import Dropdown from './Dropdown';

const Filter = ({ options, selectedOption }) => (
    <div className="filter">
        <p>Filter</p>
        <Dropdown options={options} selectedOption={selectedOption} />
    </div>
);

export default Filter;
