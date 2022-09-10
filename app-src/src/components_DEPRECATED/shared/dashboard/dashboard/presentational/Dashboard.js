import React from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <BlockContainer>
            <BlockHeading title="Live Pin Feed" />
        </BlockContainer>
    </>
);

export default Dashboard;
