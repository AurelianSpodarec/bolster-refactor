import React from 'react';

import AllClientsTableContainer from '../containers/AllClientsTableContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AllClients = () => (
    <>
        <PageHeading title="All clients" />
        <AllClientsTableContainer />
    </>
);

export default AllClients;
