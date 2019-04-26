import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinFiltersContainer from '../containers/PinFiltersContainer';

const AllReports = () => (
    <>
        <PageHeading title="Reports" withBackButton />

        <PinFiltersContainer />
    </>
);

export default AllReports;
