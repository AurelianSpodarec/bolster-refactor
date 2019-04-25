import React from 'react';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllOperatives = () => (
    <>
        <PageHeading title="All Operatives" withBackButton />

        <AllOperativesTableContainer />
    </>
);

export default AllOperatives;
