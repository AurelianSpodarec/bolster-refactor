import React from 'react';

import AllClientsTableContainer from '../containers/AllClientsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllClients = () => (
    <>
        <PageHeading title="All clients" />
        <AllClientsTableContainer />
    </>
);

export default AllClients;
