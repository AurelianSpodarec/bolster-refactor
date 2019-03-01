import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ resultsVisible }) => (
    <div
        className={`dropdown-search-results ${resultsVisible ? 'visible' : ''}`}
    >
        <Link to="#">
            <i className="far fa-file-edit" /> CMFT Hospital / Main Building /
            Floor 2 / Entrance Hall
        </Link>
        <Link to="#">
            <i className="far fa-file-edit" /> CMFT Hospital / Main Building /
            Floor 2 / Back Room
        </Link>
        <Link to="#">
            <i className="far fa-file-edit" /> CMFT Hospital / Main Building /
            Floor 3
        </Link>
    </div>
);

export default SearchResults;
