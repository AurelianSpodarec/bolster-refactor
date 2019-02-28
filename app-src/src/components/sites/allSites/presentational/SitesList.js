import React from 'react';

import Error from 'components/generic/presentational/Error';
import Loading from 'components/generic/presentational/Loading';

const SitesList = ({ sites, isFetching, error }) => {
    if (error && error.length) return <Error>{error}</Error>;
    if (isFetching) return <Loading />;
    if (sites.length) return <p>There are no sites.</p>;

    return <h2>sites list</h2>;
};

export default SitesList;
