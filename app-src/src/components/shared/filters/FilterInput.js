import React from 'react';

const FilterInput = ({
    value,
    handleChange,
    omitIcon,
    placeholder = 'Search...',
    extraContainerClasses = '',
}) => (
    <div className={`filter-input ${extraContainerClasses}`}>
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
