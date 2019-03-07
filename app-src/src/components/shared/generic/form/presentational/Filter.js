import React from 'react';

import Dropdown from './Dropdown';

const Filter = ({ options, selectedOption }) => (
    <div className="filter">
        <div className="field">
            <label>Filter</label>
            <Dropdown options={options} selectedOption={selectedOption} />
        </div>
    </div>
);

export default Filter;
