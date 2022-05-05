import React, { useRef } from 'react';

const Search = ({
    name,
    placeholder,
    value,
    handleChange,
    autoComplete = 'off',
    className = '',
}) => {
    const inputRef = useRef(null);

    return (
        <div className={`generic-search ${className}`}>
            <input
                autoComplete={autoComplete}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                ref={inputRef}
            />
            <i className="search-icon far fa-search" />
        </div>
    );
};

export default Search;
