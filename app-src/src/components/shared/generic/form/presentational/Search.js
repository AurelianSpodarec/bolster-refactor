import React from 'react';

const Search = ({
    name,
    placeholder,
    value,
    handleChange,
    autoComplete = 'off',
    omitIcon = false,
}) => (
    <div className="generic-search">
        {!omitIcon && <i className="search-icon far fa-search" />}
        <input
            autoComplete={autoComplete}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
    </div>
);

export default Search;
