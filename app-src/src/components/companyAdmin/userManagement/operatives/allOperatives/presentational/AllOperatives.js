import React from 'react';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllOperatives = () => (
    <>
        <PageHeading title="All Operatives" />

        <AllOperativesTableContainer />
    </>
);

export default AllOperatives;
