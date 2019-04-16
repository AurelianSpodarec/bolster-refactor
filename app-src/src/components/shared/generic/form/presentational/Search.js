import React from 'react';

const Search = ({ name, placeholder, value, handleChange }) => (
    <div className="generic-search">
        <i className="search-icon far fa-search" />
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    </div>
);

export default Search;
