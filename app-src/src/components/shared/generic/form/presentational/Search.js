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
            <i className="search-icon far fa-search" />
            <input
                autoComplete={autoComplete}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                ref={inputRef}
            />
            <button
                className="clear-button"
                type="button"
                onClick={() => {
                    inputRef.current.value = '';
                    handleChange(name, '');
                }}
            >
                <i className="far fa-times" />
            </button>
        </div>
    );
};

export default Search;
