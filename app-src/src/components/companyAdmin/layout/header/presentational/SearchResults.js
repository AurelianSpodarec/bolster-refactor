import React from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const SearchResults = ({ results, error, handleLinkClick, isLoading }) =>
    error ? (
        <Error>{error}</Error>
    ) : isLoading && results && !results.length ? <Loading /> : results && results.length ? (
        results.map(result => (
            <Link
                to={`/company/${result.type}/${result.hierarchyID}`}
                key={result.id}
                onClick={handleLinkClick}
            >
                {result.searchText}
            </Link>
        ))
    ) : (
            <Link to="#">No results found</Link>
        );

export default SearchResults;
