import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinFiltersContainer from '../containers/PinFiltersContainer';

const AllReports = () => (
    <>
        <PageHeading title="Reports" />

        <PinFiltersContainer />
    </>
);

export default AllReports;
