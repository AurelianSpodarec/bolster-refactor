import React from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const SearchResults = ({ results, isFetching, error, handleLinkClick }) =>
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
