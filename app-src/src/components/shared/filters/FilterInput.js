import React from 'react';

const FilterInput = ({ value, handleChange, omitIcon, placeholder = 'Search...' }) => (
    <div className="filter-input">
        {!omitIcon && <i className="search-icon far fa-search" />}
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            name="filterInput"
            onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
    </div>
);

export default FilterInput;
