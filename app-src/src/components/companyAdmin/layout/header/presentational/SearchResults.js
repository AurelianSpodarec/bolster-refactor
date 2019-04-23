import React from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/shared/generic/misc/presentational/Error';

const SearchResults = ({ results, error, handleLinkClick }) =>
    error ? (
        <Error>{error}</Error>
    ) : (
        results.map(result => (
            <Link
                to={`/company/${result.type}/${result.hierarchyID}`}
                key={result.id}
                onClick={handleLinkClick}
            >
                {result.searchText}
            </Link>
        ))
    );

export default SearchResults;
