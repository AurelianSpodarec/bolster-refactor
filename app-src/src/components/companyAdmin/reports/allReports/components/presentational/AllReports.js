import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinFiltersContainer from '../containers/PinFiltersContainer';

const AllReports = () => (
    <>
        <PageHeading title="All Reports" />
        <BlockContainer>
            <PinFiltersContainer />
        </BlockContainer>
    </>
);

export default AllReports;
