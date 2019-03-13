import React from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const SearchResults = ({ results, isFetching, error, handleLinkClick }) => {
    if (error) {
        return <Error>{error}</Error>;
    }

    if (isFetching) {
        return <Loading />;
    }

    return results.map(result => (
        <Link
            to={`/${result.linkData}/${result.linkId}`}
            key={result.id}
            onClick={handleLinkClick}
        >
            <i className="far fa-file-edit" /> {result.title}
        </Link>
    ));
};

export default SearchResults;
