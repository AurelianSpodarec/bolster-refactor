import React from 'react';

const Search = props => (
    <div className="generic-search">
        <i className="search-icon far fa-search" />
        <input
            type="text"
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
        />
    </div>
);

export default Search;
