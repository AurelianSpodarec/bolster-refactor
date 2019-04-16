import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllReports = () => (
    <>
        <PageHeading title="All Reports" />
        <BlockContainer>
            <BlockHeading title="Reports Table" />
        </BlockContainer>
    </>
);

export default AllReports;
