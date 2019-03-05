import React from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/generic/misc/containers/Error';
import Loading from 'components/generic/misc/containers/Loading';

const SearchResults = ({ results, isFetching, error }) => {
    if (error) {
        return <Error>{error}</Error>;
    }

    if (isFetching) {
        return <Loading />;
    }

    return results.map(result => (
        <Link to={`/${result.linkData}/${result.linkId}`} key={result.id}>
            <i className="far fa-file-edit" /> {result.title}
        </Link>
    ));
};

export default SearchResults;
